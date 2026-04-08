const mongoose = require('mongoose');
const applyIndexes = require('./shared/applyIndexes');
const buildModel = require('./shared/buildModel');
const { NO_TIMESTAMPS_SCHEMA_OPTIONS } = require('./shared/schemaOptions');
const { activityMetadataSchema } = require('./schemas/activitySchemas');

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      trim: true,
    },
    entityType: {
      type: String,
      trim: true,
    },
    entityId: mongoose.Schema.Types.ObjectId,
    metadata: {
      type: activityMetadataSchema,
      default: () => ({}),
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  NO_TIMESTAMPS_SCHEMA_OPTIONS
);

applyIndexes(activityLogSchema, [
  [{ userId: 1, timestamp: -1 }, { background: true }],
  [{ action: 1, timestamp: -1 }, { background: true }],
  [{ entityType: 1, entityId: 1 }, { background: true }],
  [{ timestamp: 1 }, { expireAfterSeconds: 31536000, background: true }],
]);

module.exports = buildModel('ActivityLog', activityLogSchema, 'activityLogs');
