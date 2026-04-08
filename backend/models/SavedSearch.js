const mongoose = require('mongoose');
const applyIndexes = require('./shared/applyIndexes');
const buildModel = require('./shared/buildModel');
const { DEFAULT_SCHEMA_OPTIONS } = require('./shared/schemaOptions');
const { ALERT_FREQUENCIES } = require('./shared/enums');
const { searchCriteriaSchema } = require('./schemas/savedSearchSchemas');

const savedSearchSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    searchCriteria: {
      type: searchCriteriaSchema,
      default: () => ({}),
    },
    alertEnabled: {
      type: Boolean,
      default: true,
    },
    alertFrequency: {
      type: String,
      enum: ALERT_FREQUENCIES,
      default: ALERT_FREQUENCIES[0],
    },
    lastAlertSent: Date,
    totalAlertsDelivered: {
      type: Number,
      default: 0,
      min: 0,
    },
    matchCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    newMatchCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastMatchedAt: Date,
    active: {
      type: Boolean,
      default: true,
    },
  },
  DEFAULT_SCHEMA_OPTIONS
);

applyIndexes(savedSearchSchema, [
  [{ userId: 1, active: 1 }, { background: true }],
  [{ alertEnabled: 1, alertFrequency: 1 }, { background: true }],
]);

module.exports = buildModel('SavedSearch', savedSearchSchema, 'savedSearches');
