const fs = require('fs/promises');
const path = require('path');
const mongoose = require('mongoose');
const Property = require('../models/Property');
const asyncHandler = require('../utils/asyncHandler');
const createHttpError = require('../utils/httpError');
const { buildPropertyQuery, normalizePropertyPayload } = require('../utils/propertyUtils');
const { uploadsDir } = require('../utils/upload');

function getUploadedImagePaths(files = []) {
  return files.map((file) => `/uploads/${path.basename(file.filename)}`);
}

function getPropertyImagePaths(property) {
  return (property?.media?.images || [])
    .map((image) => image?.url)
    .filter(Boolean);
}

function buildMediaImages(imagePaths = [], existingImages = []) {
  const existingByUrl = new Map(
    (existingImages || [])
      .filter((image) => image && image.url)
      .map((image) => [image.url, image])
  );

  return imagePaths.map((url, index) => {
    const existingImage = existingByUrl.get(url);

    return {
      url,
      caption: existingImage?.caption,
      isPrimary: index === 0,
      order: index,
    };
  });
}

async function removeLocalImages(imagePaths = []) {
  await Promise.all(
    imagePaths.map(async (imagePath) => {
      const fileName = path.basename(imagePath);

      if (!fileName) {
        return;
      }

      try {
        await fs.unlink(path.join(uploadsDir, fileName));
      } catch (error) {
        if (error.code !== 'ENOENT') {
          console.error(`Failed to delete image ${fileName}:`, error);
        }
      }
    })
  );
}

async function getPropertyOrThrow(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createHttpError(400, 'Invalid property id.');
  }

  const property = await Property.findById(id);

  if (!property) {
    throw createHttpError(404, 'Property not found.');
  }

  return property;
}

const listProperties = asyncHandler(async (req, res) => {
  const { filter, sort, sortBy, page, limit, skip } = buildPropertyQuery(req.query);

  const [properties, total] = await Promise.all([
    Property.find(filter).sort(sort).skip(skip).limit(limit).lean({ virtuals: true }),
    Property.countDocuments(filter),
  ]);

  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

  res.status(200).json({
    data: properties,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      sort: sortBy,
    },
  });
});

const getPropertyById = asyncHandler(async (req, res) => {
  const property = await getPropertyOrThrow(req.params.id);
  res.status(200).json(property);
});

const createProperty = asyncHandler(async (req, res) => {
  const uploadedImages = getUploadedImagePaths(req.files);

  try {
    const { data, errors } = normalizePropertyPayload(req.body, 'create');

    if (Object.keys(errors).length > 0) {
      throw createHttpError(400, 'Invalid property payload.', errors);
    }

    const retainedImages = data.existingImages || [];
    delete data.existingImages;

    const property = await Property.create({
      ...data,
      media: {
        ...(data.media || {}),
        images: buildMediaImages([...retainedImages, ...uploadedImages]),
      },
    });

    res.status(201).json({
      message: 'Property created successfully.',
      data: property,
    });
  } catch (error) {
    await removeLocalImages(uploadedImages);
    throw error;
  }
});

const updateProperty = asyncHandler(async (req, res) => {
  const property = await getPropertyOrThrow(req.params.id);
  const uploadedImages = getUploadedImagePaths(req.files);
  const currentImagePaths = getPropertyImagePaths(property);

  try {
    const { data, errors } = normalizePropertyPayload(req.body, 'update');

    if (Object.keys(errors).length > 0) {
      throw createHttpError(400, 'Invalid property payload.', errors);
    }

    const retainedImages =
      data.existingImages !== undefined ? data.existingImages : currentImagePaths;

    delete data.existingImages;

    const imagesChanged =
      retainedImages.length !== currentImagePaths.length ||
      retainedImages.some((imagePath, index) => imagePath !== currentImagePaths[index]) ||
      uploadedImages.length > 0;

    if (Object.keys(data).length === 0 && !imagesChanged) {
      throw createHttpError(400, 'No property changes were provided.');
    }

    const imagesToDelete = currentImagePaths.filter(
      (imagePath) => !retainedImages.includes(imagePath)
    );

    const currentMedia =
      typeof property.media?.toObject === 'function' ? property.media.toObject() : property.media || {};

    property.set({
      ...data,
      media: {
        ...currentMedia,
        images: buildMediaImages(
          [...retainedImages, ...uploadedImages],
          currentMedia.images || []
        ),
      },
    });

    await property.save();
    await removeLocalImages(imagesToDelete);

    res.status(200).json({
      message: 'Property updated successfully.',
      data: property,
    });
  } catch (error) {
    await removeLocalImages(uploadedImages);
    throw error;
  }
});

const deleteProperty = asyncHandler(async (req, res) => {
  const property = await getPropertyOrThrow(req.params.id);
  await property.deleteOne();
  await removeLocalImages(getPropertyImagePaths(property));

  res.status(200).json({
    message: 'Property deleted successfully.',
  });
});

module.exports = {
  createProperty,
  deleteProperty,
  getPropertyById,
  listProperties,
  updateProperty,
};
