const mongoose = require('mongoose');
const { SUBDOCUMENT_SCHEMA_OPTIONS } = require('../shared/schemaOptions');

const deviceInfoSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      trim: true,
    },
    deviceType: {
      type: String,
      enum: ['mobile', 'web', 'tablet'],
    },
    os: {
      type: String,
      trim: true,
    },
    browser: {
      type: String,
      trim: true,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

module.exports = {
  deviceInfoSchema,
};
