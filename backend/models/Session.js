const mongoose = require('mongoose');
const applyIndexes = require('./shared/applyIndexes');
const buildModel = require('./shared/buildModel');
const { CREATED_ONLY_SCHEMA_OPTIONS } = require('./shared/schemaOptions');
const { deviceInfoSchema } = require('./schemas/sessionSchemas');

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
      select: false,
    },
    accessToken: {
      type: String,
      select: false,
    },
    deviceInfo: {
      type: deviceInfoSchema,
      default: () => ({}),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  CREATED_ONLY_SCHEMA_OPTIONS
);

applyIndexes(sessionSchema, [
  [{ userId: 1, isActive: 1 }, { background: true }],
  [{ expiresAt: 1 }, { expireAfterSeconds: 0, background: true }],
  [{ 'deviceInfo.deviceId': 1 }, { sparse: true, background: true }],
]);

module.exports = buildModel('Session', sessionSchema, 'sessions');
