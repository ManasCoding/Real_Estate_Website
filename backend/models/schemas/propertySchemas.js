const mongoose = require('mongoose');
const {
  CONTACT_VISIBILITY,
  FACING_DIRECTIONS,
  FURNISHING_TYPES,
  POSSESSION_STATUSES,
  PROPERTY_OWNER_ROLES,
} = require('../shared/enums');
const { SUBDOCUMENT_SCHEMA_OPTIONS } = require('../shared/schemaOptions');
const { pointSchema } = require('./commonSchemas');

const propertyLocationSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      trim: true,
    },
    locality: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
      default: 'India',
    },
    pincode: {
      type: String,
      trim: true,
    },
    landmark: {
      type: String,
      trim: true,
    },
    coordinates: {
      type: pointSchema,
      default: undefined,
    },
    mapUrl: {
      type: String,
      trim: true,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const parkingSchema = new mongoose.Schema(
  {
    covered: {
      type: Number,
      default: 0,
      min: 0,
    },
    open: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const specificationsSchema = new mongoose.Schema(
  {
    carpetArea: {
      type: Number,
      min: 0,
    },
    builtUpArea: {
      type: Number,
      min: 0,
    },
    superBuiltUpArea: {
      type: Number,
      min: 0,
    },
    plotArea: {
      type: Number,
      min: 0,
    },
    bedrooms: {
      type: Number,
      min: 0,
    },
    bathrooms: {
      type: Number,
      min: 0,
    },
    balconies: {
      type: Number,
      min: 0,
    },
    floor: {
      type: Number,
      min: 0,
    },
    totalFloors: {
      type: Number,
      min: 0,
    },
    furnishing: {
      type: String,
      enum: FURNISHING_TYPES,
    },
    facing: {
      type: String,
      enum: FACING_DIRECTIONS,
    },
    parking: {
      type: parkingSchema,
      default: () => ({}),
    },
    ageOfProperty: {
      type: Number,
      min: 0,
    },
    possessionStatus: {
      type: String,
      enum: POSSESSION_STATUSES,
    },
    possessionDate: Date,
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const amenitiesSchema = new mongoose.Schema(
  {
    basic: [{ type: String, trim: true }],
    recreational: [{ type: String, trim: true }],
    safety: [{ type: String, trim: true }],
    convenience: [{ type: String, trim: true }],
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const pricingSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      trim: true,
      default: 'INR',
    },
    pricePerSqFt: {
      type: Number,
      min: 0,
    },
    negotiable: {
      type: Boolean,
      default: false,
    },
    maintenanceCharges: {
      type: Number,
      min: 0,
    },
    securityDeposit: {
      type: Number,
      min: 0,
    },
    tokenAmount: {
      type: Number,
      min: 0,
    },
    priceIncludes: [{ type: String, trim: true }],
    taxIncluded: {
      type: Boolean,
      default: false,
    },
    gstApplicable: {
      type: Boolean,
      default: false,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const propertyImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      trim: true,
      required: true,
    },
    caption: {
      type: String,
      trim: true,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const mediaSchema = new mongoose.Schema(
  {
    images: [propertyImageSchema],
    videos: [{ type: String, trim: true }],
    virtualTour: {
      type: String,
      trim: true,
    },
    floorPlan: {
      type: String,
      trim: true,
    },
    brochure: {
      type: String,
      trim: true,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const ownerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userRole: {
      type: String,
      enum: PROPERTY_OWNER_ROLES,
    },
    contactVisibility: {
      type: String,
      enum: CONTACT_VISIBILITY,
      default: CONTACT_VISIBILITY[0],
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const propertyAgentSchema = new mongoose.Schema(
  {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    commission: {
      type: Number,
      min: 0,
    },
    exclusive: {
      type: Boolean,
      default: false,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const boostSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: false,
    },
    expiresAt: Date,
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const propertyMetricsSchema = new mongoose.Schema(
  {
    views: { type: Number, default: 0, min: 0 },
    uniqueViews: { type: Number, default: 0, min: 0 },
    phoneReveals: { type: Number, default: 0, min: 0 },
    inquiries: { type: Number, default: 0, min: 0 },
    shortlists: { type: Number, default: 0, min: 0 },
    lastViewedAt: Date,
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

module.exports = {
  amenitiesSchema,
  boostSchema,
  mediaSchema,
  ownerSchema,
  pricingSchema,
  propertyAgentSchema,
  propertyImageSchema,
  propertyLocationSchema,
  propertyMetricsSchema,
  specificationsSchema,
};
