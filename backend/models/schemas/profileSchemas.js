const mongoose = require('mongoose');
const {
  COMMISSION_TYPES,
  DOCUMENT_TYPES,
  PROPERTY_TYPES,
  SPECIALIZATIONS,
  VERIFICATION_STATUSES,
  WORKING_DAYS,
} = require('../shared/enums');
const { SUBDOCUMENT_SCHEMA_OPTIONS } = require('../shared/schemaOptions');
const { pointSchema } = require('./commonSchemas');
const { timeRegex } = require('../shared/validators');

const preferredLocationSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      trim: true,
    },
    locality: [
      {
        type: String,
        trim: true,
      },
    ],
    coordinates: {
      type: pointSchema,
      default: undefined,
    },
    radius: {
      type: Number,
      min: 0,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const budgetRangeSchema = new mongoose.Schema(
  {
    min: {
      type: Number,
      min: 0,
    },
    max: {
      type: Number,
      min: 0,
    },
    currency: {
      type: String,
      trim: true,
      default: 'INR',
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const propertyPreferencesSchema = new mongoose.Schema(
  {
    types: [
      {
        type: String,
        enum: PROPERTY_TYPES,
      },
    ],
    minBedrooms: {
      type: Number,
      min: 0,
    },
    maxBedrooms: {
      type: Number,
      min: 0,
    },
    minArea: {
      type: Number,
      min: 0,
    },
    maxArea: {
      type: Number,
      min: 0,
    },
    furnished: [
      {
        type: String,
        trim: true,
      },
    ],
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const buyerSavedSearchSchema = new mongoose.Schema(
  {
    searchQuery: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    name: {
      type: String,
      trim: true,
    },
    alertEnabled: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const viewedPropertySchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    viewedAt: {
      type: Date,
      default: Date.now,
    },
    viewDuration: {
      type: Number,
      min: 0,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const verificationDocumentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: DOCUMENT_TYPES,
      required: true,
    },
    documentUrl: {
      type: String,
      trim: true,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    verifiedAt: Date,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: VERIFICATION_STATUSES,
      default: VERIFICATION_STATUSES[0],
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const kycDetailsSchema = new mongoose.Schema(
  {
    aadharNumber: {
      type: String,
      trim: true,
    },
    panNumber: {
      type: String,
      trim: true,
    },
    gstNumber: {
      type: String,
      trim: true,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const agencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    registrationNumber: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const serviceAreaSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      trim: true,
    },
    localities: [
      {
        type: String,
        trim: true,
      },
    ],
    coordinates: {
      type: pointSchema,
      default: undefined,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const commissionStructureSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: COMMISSION_TYPES,
      default: COMMISSION_TYPES[0],
    },
    sale: {
      type: Number,
      min: 0,
    },
    rental: {
      type: Number,
      min: 0,
    },
    negotiable: {
      type: Boolean,
      default: false,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const agentStatsSchema = new mongoose.Schema(
  {
    totalDeals: {
      type: Number,
      default: 0,
      min: 0,
    },
    dealsThisMonth: {
      type: Number,
      default: 0,
      min: 0,
    },
    dealsThisYear: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
      min: 0,
    },
    avgDealValue: {
      type: Number,
      default: 0,
      min: 0,
    },
    successRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    avgClosingTime: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const workingHourSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: WORKING_DAYS,
      required: true,
    },
    startTime: {
      type: String,
      match: timeRegex,
    },
    endTime: {
      type: String,
      match: timeRegex,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

module.exports = {
  agencySchema,
  agentStatsSchema,
  budgetRangeSchema,
  buyerSavedSearchSchema,
  commissionStructureSchema,
  kycDetailsSchema,
  preferredLocationSchema,
  propertyPreferencesSchema,
  serviceAreaSchema,
  verificationDocumentSchema,
  viewedPropertySchema,
  workingHourSchema,
};
