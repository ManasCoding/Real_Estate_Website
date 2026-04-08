const mongoose = require('mongoose');
const applyIndexes = require('./shared/applyIndexes');
const buildModel = require('./shared/buildModel');
const { DEFAULT_SCHEMA_OPTIONS } = require('./shared/schemaOptions');
const {
  budgetRangeSchema,
  buyerSavedSearchSchema,
  preferredLocationSchema,
  propertyPreferencesSchema,
  viewedPropertySchema,
} = require('./schemas/profileSchemas');

const buyerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    preferredLocations: [preferredLocationSchema],
    budgetRange: {
      type: budgetRangeSchema,
      default: () => ({}),
    },
    propertyPreferences: {
      type: propertyPreferencesSchema,
      default: () => ({}),
    },
    savedSearches: [buyerSavedSearchSchema],
    savedProperties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
    viewedProperties: [viewedPropertySchema],
    favoriteAgents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    blockedAgents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    searchCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    inquiryCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastSearchAt: Date,
  },
  DEFAULT_SCHEMA_OPTIONS
);

applyIndexes(buyerProfileSchema, [
  [{ userId: 1 }, { unique: true, background: true }],
  [{ 'preferredLocations.city': 1 }, { background: true }],
  [{ 'budgetRange.min': 1, 'budgetRange.max': 1 }, { background: true }],
  [{ savedProperties: 1 }, { background: true }],
  [{ 'viewedProperties.viewedAt': 1 }, { expireAfterSeconds: 7776000, background: true }],
]);

module.exports = buildModel('BuyerProfile', buyerProfileSchema, 'buyerProfiles');
