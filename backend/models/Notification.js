const mongoose = require('mongoose');
const applyIndexes = require('./shared/applyIndexes');
const buildModel = require('./shared/buildModel');
const { CREATED_ONLY_SCHEMA_OPTIONS } = require('./shared/schemaOptions');
const {
  NOTIFICATION_CATEGORIES,
  NOTIFICATION_CHANNELS,
  NOTIFICATION_TYPES,
  PRIORITIES,
} = require('./shared/enums');
const { deliveryStatusSchema, relatedEntitySchema } = require('./schemas/notificationSchemas');

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: NOTIFICATION_TYPES,
      required: true,
    },
    category: {
      type: String,
      enum: NOTIFICATION_CATEGORIES,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    relatedEntity: {
      type: relatedEntitySchema,
      default: undefined,
    },
    actionUrl: {
      type: String,
      trim: true,
    },
    actionText: {
      type: String,
      trim: true,
    },
    channels: [{ type: String, enum: NOTIFICATION_CHANNELS }],
    deliveryStatus: {
      type: deliveryStatusSchema,
      default: () => ({}),
    },
    read: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    clicked: {
      type: Boolean,
      default: false,
    },
    clickedAt: Date,
    priority: {
      type: String,
      enum: PRIORITIES,
      default: 'medium',
    },
    expiresAt: Date,
    sentAt: Date,
  },
  CREATED_ONLY_SCHEMA_OPTIONS
);

applyIndexes(notificationSchema, [
  [{ userId: 1, read: 1, createdAt: -1 }, { background: true }],
  [{ userId: 1, type: 1 }, { background: true }],
  [{ expiresAt: 1 }, { expireAfterSeconds: 0, background: true }],
  [{ createdAt: 1 }, { expireAfterSeconds: 7776000, background: true }],
]);

module.exports = buildModel('Notification', notificationSchema, 'notifications');
