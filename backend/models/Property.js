const mongoose = require('mongoose');
const applyIndexes = require('./shared/applyIndexes');
const buildModel = require('./shared/buildModel');
const { DEFAULT_SCHEMA_OPTIONS } = require('./shared/schemaOptions');
const {
  LISTING_TYPES,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
  VERIFICATION_STATUSES,
} = require('./shared/enums');
const {
  amenitiesSchema,
  boostSchema,
  mediaSchema,
  ownerSchema,
  pricingSchema,
  propertyAgentSchema,
  propertyLocationSchema,
  propertyMetricsSchema,
  specificationsSchema,
} = require('./schemas/propertySchemas');

function getPrimaryArea(specifications = {}) {
  return (
    specifications.builtUpArea ??
    specifications.carpetArea ??
    specifications.superBuiltUpArea ??
    specifications.plotArea ??
    null
  );
}

function getImageUrls(media = {}) {
  return (media.images || []).map((image) => image.url).filter(Boolean);
}

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    propertyType: {
      type: String,
      enum: PROPERTY_TYPES,
      required: true,
      default: PROPERTY_TYPES[0],
    },
    listingType: {
      type: String,
      enum: LISTING_TYPES,
      required: true,
      default: LISTING_TYPES[0],
    },
    location: {
      type: propertyLocationSchema,
      required: true,
    },
    specifications: {
      type: specificationsSchema,
      default: () => ({}),
    },
    amenities: {
      type: amenitiesSchema,
      default: () => ({}),
    },
    pricing: {
      type: pricingSchema,
      required: true,
    },
    media: {
      type: mediaSchema,
      default: () => ({}),
    },
    owner: {
      type: ownerSchema,
      default: () => ({}),
    },
    agent: {
      type: propertyAgentSchema,
      default: () => ({}),
    },
    status: {
      type: String,
      enum: PROPERTY_STATUSES,
      default: 'active',
    },
    verificationStatus: {
      type: String,
      enum: VERIFICATION_STATUSES,
      default: VERIFICATION_STATUSES[0],
    },
    verifiedAt: Date,
    rejectionReason: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    premium: {
      type: Boolean,
      default: false,
    },
    boost: {
      type: boostSchema,
      default: () => ({}),
    },
    metrics: {
      type: propertyMetricsSchema,
      default: () => ({}),
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    metaTitle: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: 320,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    publishedAt: Date,
    expiresAt: Date,
    lastBoostedAt: Date,
  },
  {
    ...DEFAULT_SCHEMA_OPTIONS,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

propertySchema.pre('validate', async function enrichProperty() {
  const area = getPrimaryArea(this.specifications || {});

  if (
    this.pricing &&
    this.pricing.amount &&
    area &&
    !this.pricing.pricePerSqFt
  ) {
    this.pricing.pricePerSqFt = Number((this.pricing.amount / area).toFixed(2));
  }

  if (this.status === 'active' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  const images = this.media?.images || [];
  if (images.length > 0) {
    images.forEach((image, index) => {
      image.order = index;
      image.isPrimary = index === 0;
    });
  }
});

propertySchema.virtual('price')
  .get(function getPrice() {
    return this.pricing?.amount ?? null;
  })
  .set(function setPrice(value) {
    this.pricing = this.pricing || {};
    this.pricing.amount = value;
  });

propertySchema.virtual('type')
  .get(function getType() {
    return this.propertyType;
  })
  .set(function setType(value) {
    this.propertyType = value;
  });

propertySchema.virtual('bedrooms')
  .get(function getBedrooms() {
    return this.specifications?.bedrooms ?? null;
  })
  .set(function setBedrooms(value) {
    this.specifications = this.specifications || {};
    this.specifications.bedrooms = value;
  });

propertySchema.virtual('bathrooms')
  .get(function getBathrooms() {
    return this.specifications?.bathrooms ?? null;
  })
  .set(function setBathrooms(value) {
    this.specifications = this.specifications || {};
    this.specifications.bathrooms = value;
  });

propertySchema.virtual('area')
  .get(function getArea() {
    return getPrimaryArea(this.specifications || {});
  })
  .set(function setArea(value) {
    this.specifications = this.specifications || {};
    this.specifications.builtUpArea = value;
  });

propertySchema.virtual('images')
  .get(function getImages() {
    return getImageUrls(this.media || {});
  })
  .set(function setImages(imageUrls) {
    this.media = this.media || {};
    this.media.images = (imageUrls || [])
      .filter(Boolean)
      .map((url, index) => ({
        url,
        order: index,
        isPrimary: index === 0,
      }));
  });

propertySchema.virtual('locationLabel').get(function getLocationLabel() {
  if (!this.location) {
    return '';
  }

  return (
    [this.location.locality, this.location.city].filter(Boolean).join(', ') ||
    this.location.address ||
    ''
  );
});

applyIndexes(propertySchema, [
  [{ 'location.coordinates': '2dsphere' }, { background: true }],
  [{ 'location.city': 1, propertyType: 1, listingType: 1, status: 1 }, { background: true }],
  [{ 'pricing.amount': 1 }, { background: true }],
  [
    {
      title: 'text',
      description: 'text',
      'location.locality': 'text',
      'location.city': 'text',
      tags: 'text',
    },
    {
      background: true,
      weights: {
        title: 10,
        'location.city': 5,
        'location.locality': 3,
        description: 1,
      },
    },
  ],
  [{ 'owner.userId': 1, status: 1 }, { background: true }],
  [{ 'agent.agentId': 1 }, { background: true }],
  [{ status: 1, featured: -1, createdAt: -1 }, { background: true }],
  [{ slug: 1 }, { unique: true, sparse: true, background: true }],
  [{ expiresAt: 1 }, { expireAfterSeconds: 0, background: true }],
  [
    { createdAt: -1 },
    {
      partialFilterExpression: { status: 'active' },
      background: true,
    },
  ],
]);

module.exports = buildModel('Property', propertySchema, 'properties');
