const {
  LEGACY_LISTING_TYPE_MAP,
  LEGACY_PROPERTY_TYPE_MAP,
  LISTING_TYPES,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
} = require('../models/shared/enums');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 9;
const MAX_LIMIT = 50;

const SORT_OPTIONS = {
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  price_asc: { 'pricing.amount': 1, createdAt: -1 },
  price_desc: { 'pricing.amount': -1, createdAt: -1 },
  area_asc: { 'specifications.builtUpArea': 1, createdAt: -1 },
  area_desc: { 'specifications.builtUpArea': -1, createdAt: -1 },
};

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parsePositiveInteger(value, fallback, max) {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return typeof max === 'number' ? Math.min(parsed, max) : parsed;
}

function parseFilterNumber(value) {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseFieldNumber(value, fieldName, errors, options = {}) {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    errors[fieldName] = `${fieldName} must be a valid number.`;
    return undefined;
  }

  if (options.integer && !Number.isInteger(parsed)) {
    errors[fieldName] = `${fieldName} must be a whole number.`;
    return undefined;
  }

  if (typeof options.min === 'number' && parsed < options.min) {
    errors[fieldName] = `${fieldName} must be at least ${options.min}.`;
    return undefined;
  }

  return parsed;
}

function normalizePropertyType(value) {
  const cleanedValue = cleanString(value);

  if (!cleanedValue) {
    return undefined;
  }

  return LEGACY_PROPERTY_TYPE_MAP[cleanedValue] || cleanedValue.toLowerCase();
}

function normalizeListingType(value) {
  const cleanedValue = cleanString(value);

  if (!cleanedValue) {
    return undefined;
  }

  return LEGACY_LISTING_TYPE_MAP[cleanedValue] || cleanedValue.toLowerCase();
}

function parseExistingImages(value) {
  if (value === undefined) {
    return { value: undefined };
  }

  const normalize = (items) => items.map(cleanString).filter(Boolean);

  if (Array.isArray(value)) {
    return { value: normalize(value) };
  }

  if (typeof value !== 'string') {
    return { error: 'existingImages must be an array of image paths.' };
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return { value: [] };
  }

  if (trimmedValue.startsWith('[') || trimmedValue.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmedValue);

      if (!Array.isArray(parsed)) {
        return { error: 'existingImages must be a JSON array of image paths.' };
      }

      return { value: normalize(parsed) };
    } catch (error) {
      return { error: 'existingImages must be valid JSON when sent as a string.' };
    }
  }

  return { value: normalize(trimmedValue.split(',')) };
}

function buildLocationPayload(payload, errors, mode) {
  const rawLocation = payload.location;

  if (typeof rawLocation === 'string') {
    const city = cleanString(rawLocation);

    if (!city && mode === 'create') {
      errors.location = 'location is required.';
      return undefined;
    }

    return city ? { city } : undefined;
  }

  if (rawLocation && typeof rawLocation === 'object' && !Array.isArray(rawLocation)) {
    const location = {};
    const city = cleanString(rawLocation.city || payload.city);

    if (!city && mode === 'create') {
      errors.location = 'location.city is required.';
    } else if (city) {
      location.city = city;
    }

    ['address', 'locality', 'state', 'country', 'pincode', 'landmark', 'mapUrl'].forEach(
      (field) => {
        const value = cleanString(rawLocation[field]);
        if (value) {
          location[field] = value;
        }
      }
    );

    return Object.keys(location).length > 0 ? location : undefined;
  }

  const city = cleanString(payload.city);

  if (!city && mode === 'create') {
    errors.location = 'location is required.';
    return undefined;
  }

  return city ? { city } : undefined;
}

function normalizePropertyPayload(payload = {}, mode = 'create') {
  const errors = {};
  const data = {};
  const isCreateMode = mode === 'create';

  if (isCreateMode || payload.title !== undefined) {
    const title = cleanString(payload.title);

    if (!title) {
      errors.title = 'title is required.';
    } else {
      data.title = title;
    }
  }

  if (isCreateMode || payload.description !== undefined) {
    const description = cleanString(payload.description);

    if (!description) {
      errors.description = 'description is required.';
    } else {
      data.description = description;
    }
  }

  if (isCreateMode || payload.location !== undefined || payload.city !== undefined) {
    const location = buildLocationPayload(payload, errors, mode);

    if (location) {
      data.location = location;
    }
  }

  if (isCreateMode || payload.price !== undefined || payload.pricing?.amount !== undefined) {
    const price = parseFieldNumber(
      payload.price ?? payload.pricing?.amount,
      'price',
      errors,
      { min: 0 }
    );

    if (price === undefined && isCreateMode && !errors.price) {
      errors.price = 'price is required.';
    } else if (price !== undefined) {
      data.pricing = {
        ...(data.pricing || {}),
        amount: price,
      };
    }
  }

  if (payload.type !== undefined || payload.propertyType !== undefined || isCreateMode) {
    const type = normalizePropertyType(payload.propertyType ?? payload.type) || PROPERTY_TYPES[0];

    if (!PROPERTY_TYPES.includes(type)) {
      errors.type = `type must be one of: ${PROPERTY_TYPES.join(', ')}.`;
    } else {
      data.propertyType = type;
    }
  }

  if (payload.status !== undefined || payload.listingType !== undefined || isCreateMode) {
    const listingType =
      normalizeListingType(payload.listingType ?? payload.status) || LISTING_TYPES[0];

    if (!LISTING_TYPES.includes(listingType)) {
      errors.status = `status must be one of: ${LISTING_TYPES.join(', ')}.`;
    } else {
      data.listingType = listingType;
    }
  }

  if (payload.propertyStatus !== undefined) {
    const propertyStatus = cleanString(payload.propertyStatus).toLowerCase();

    if (!PROPERTY_STATUSES.includes(propertyStatus)) {
      errors.propertyStatus = `propertyStatus must be one of: ${PROPERTY_STATUSES.join(', ')}.`;
    } else {
      data.status = propertyStatus;
    }
  }

  const bedrooms = parseFieldNumber(
    payload.bedrooms ?? payload.specifications?.bedrooms,
    'bedrooms',
    errors,
    {
      integer: true,
      min: 0,
    }
  );
  if (bedrooms !== undefined) {
    data.specifications = {
      ...(data.specifications || {}),
      bedrooms,
    };
  }

  const bathrooms = parseFieldNumber(
    payload.bathrooms ?? payload.specifications?.bathrooms,
    'bathrooms',
    errors,
    {
      integer: true,
      min: 0,
    }
  );
  if (bathrooms !== undefined) {
    data.specifications = {
      ...(data.specifications || {}),
      bathrooms,
    };
  }

  const area = parseFieldNumber(
    payload.area ?? payload.specifications?.builtUpArea,
    'area',
    errors,
    { min: 0 }
  );
  if (area !== undefined) {
    data.specifications = {
      ...(data.specifications || {}),
      builtUpArea: area,
    };
  }

  const parsedExistingImages = parseExistingImages(payload.existingImages);
  if (parsedExistingImages.error) {
    errors.existingImages = parsedExistingImages.error;
  } else if (parsedExistingImages.value !== undefined) {
    data.existingImages = parsedExistingImages.value;
  }

  return { data, errors };
}

function buildPropertyQuery(query = {}) {
  const filter = {};
  const search = cleanString(query.search);
  const location = cleanString(query.location);
  const type = normalizePropertyType(query.propertyType ?? query.type);
  const status = normalizeListingType(query.listingType ?? query.status);
  const propertyStatus = cleanString(query.propertyStatus).toLowerCase();
  const andConditions = [];

  if (search) {
    const searchRegex = new RegExp(escapeRegex(search), 'i');
    andConditions.push({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { 'location.locality': searchRegex },
        { 'location.city': searchRegex },
        { tags: searchRegex },
      ],
    });
  }

  if (location) {
    const locationRegex = new RegExp(escapeRegex(location), 'i');
    andConditions.push({
      $or: [
        { 'location.city': locationRegex },
        { 'location.locality': locationRegex },
        { 'location.address': locationRegex },
      ],
    });
  }

  if (andConditions.length === 1) {
    Object.assign(filter, andConditions[0]);
  } else if (andConditions.length > 1) {
    filter.$and = andConditions;
  }

  if (PROPERTY_TYPES.includes(type)) {
    filter.propertyType = type;
  }

  if (LISTING_TYPES.includes(status)) {
    filter.listingType = status;
  }

  if (PROPERTY_STATUSES.includes(propertyStatus)) {
    filter.status = propertyStatus;
  }

  let minPrice = parseFilterNumber(query.minPrice);
  let maxPrice = parseFilterNumber(query.maxPrice);

  if (
    minPrice !== undefined &&
    maxPrice !== undefined &&
    minPrice > maxPrice
  ) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter['pricing.amount'] = {};

    if (minPrice !== undefined) {
      filter['pricing.amount'].$gte = minPrice;
    }

    if (maxPrice !== undefined) {
      filter['pricing.amount'].$lte = maxPrice;
    }
  }

  const minBedrooms = parseFilterNumber(query.minBedrooms);
  if (minBedrooms !== undefined) {
    filter['specifications.bedrooms'] = { $gte: minBedrooms };
  }

  const minBathrooms = parseFilterNumber(query.minBathrooms);
  if (minBathrooms !== undefined) {
    filter['specifications.bathrooms'] = { $gte: minBathrooms };
  }

  const minArea = parseFilterNumber(query.minArea);
  if (minArea !== undefined) {
    filter['specifications.builtUpArea'] = { $gte: minArea };
  }

  if (query.featured === 'true' || query.featured === true) {
    filter.featured = true;
  }

  const requestedSort = cleanString(query.sort);
  const sortBy = SORT_OPTIONS[requestedSort] ? requestedSort : 'newest';
  const page = parsePositiveInteger(query.page, DEFAULT_PAGE);
  const limit = parsePositiveInteger(query.limit, DEFAULT_LIMIT, MAX_LIMIT);

  return {
    filter,
    sort: SORT_OPTIONS[sortBy],
    sortBy,
    page,
    limit,
    skip: (page - 1) * limit,
  };
}

module.exports = {
  SORT_OPTIONS,
  buildPropertyQuery,
  normalizeListingType,
  normalizePropertyPayload,
  normalizePropertyType,
};
