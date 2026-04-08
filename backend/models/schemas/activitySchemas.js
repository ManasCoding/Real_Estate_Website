const mongoose = require('mongoose');
const { SUBDOCUMENT_SCHEMA_OPTIONS } = require('../shared/schemaOptions');

const activityMetadataSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    device: {
      type: String,
      trim: true,
    },
    location: {
      city: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
    },
    sessionId: {
      type: String,
      trim: true,
    },
    referrer: {
      type: String,
      trim: true,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

module.exports = {
  activityMetadataSchema,
};
