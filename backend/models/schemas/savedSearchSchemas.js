const mongoose = require('mongoose');
const { FURNISHING_TYPES, LISTING_TYPES, PROPERTY_TYPES } = require('../shared/enums');
const { SUBDOCUMENT_SCHEMA_OPTIONS } = require('../shared/schemaOptions');
const { pointSchema } = require('./commonSchemas');

const searchLocationSchema = new mongoose.Schema(
  {
    cities: [{ type: String, trim: true }],
    localities: [{ type: String, trim: true }],
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

const numberRangeSchema = new mongoose.Schema(
  {
    min: {
      type: Number,
      min: 0,
    },
    max: {
      type: Number,
      min: 0,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const searchCriteriaSchema = new mongoose.Schema(
  {
    propertyType: [{ type: String, enum: PROPERTY_TYPES }],
    listingType: {
      type: String,
      enum: LISTING_TYPES,
    },
    location: {
      type: searchLocationSchema,
      default: () => ({}),
    },
    priceRange: {
      type: numberRangeSchema,
      default: () => ({}),
    },
    areaRange: {
      type: numberRangeSchema,
      default: () => ({}),
    },
    bedrooms: [{ type: Number, min: 0 }],
    amenities: [{ type: String, trim: true }],
    furnishing: [{ type: String, enum: FURNISHING_TYPES }],
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

module.exports = {
  searchCriteriaSchema,
};
