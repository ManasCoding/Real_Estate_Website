const mongoose = require('mongoose');
const { USER_ROLES } = require('../shared/enums');
const { SUBDOCUMENT_SCHEMA_OPTIONS } = require('../shared/schemaOptions');

const inquiryResponseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userRole: {
      type: String,
      enum: USER_ROLES,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

module.exports = {
  inquiryResponseSchema,
};
