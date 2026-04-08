const mongoose = require('mongoose');
const applyIndexes = require('./shared/applyIndexes');
const buildModel = require('./shared/buildModel');
const { DEFAULT_SCHEMA_OPTIONS } = require('./shared/schemaOptions');
const {
  CONTACT_METHODS,
  INQUIRY_OUTCOMES,
  INQUIRY_SOURCES,
  INQUIRY_STATUSES,
  INQUIRY_TYPES,
  PRIORITIES,
} = require('./shared/enums');
const { inquiryResponseSchema } = require('./schemas/inquirySchemas');

const inquirySchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    inquiryType: {
      type: String,
      enum: INQUIRY_TYPES,
      default: INQUIRY_TYPES[3],
    },
    message: {
      type: String,
      trim: true,
    },
    preferredContactMethod: {
      type: String,
      enum: CONTACT_METHODS,
    },
    requestedDateTime: Date,
    scheduledDateTime: Date,
    confirmedDateTime: Date,
    meetingLocation: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: INQUIRY_STATUSES,
      default: INQUIRY_STATUSES[0],
    },
    priority: {
      type: String,
      enum: PRIORITIES,
      default: 'medium',
    },
    responses: [inquiryResponseSchema],
    followUpRequired: {
      type: Boolean,
      default: false,
    },
    followUpDate: Date,
    followUpCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastFollowUpAt: Date,
    outcome: {
      type: String,
      enum: INQUIRY_OUTCOMES,
      default: INQUIRY_OUTCOMES[3],
    },
    feedbackFromBuyer: {
      type: String,
      trim: true,
    },
    feedbackFromSeller: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      enum: INQUIRY_SOURCES,
      default: INQUIRY_SOURCES[0],
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    closedAt: Date,
  },
  DEFAULT_SCHEMA_OPTIONS
);

applyIndexes(inquirySchema, [
  [{ propertyId: 1, status: 1 }, { background: true }],
  [{ buyerId: 1, createdAt: -1 }, { background: true }],
  [{ sellerId: 1, status: 1 }, { background: true }],
  [{ agentId: 1, status: 1 }, { background: true }],
  [{ status: 1, priority: -1, createdAt: -1 }, { background: true }],
  [{ scheduledDateTime: 1 }, { background: true }],
  [
    { followUpDate: 1 },
    {
      partialFilterExpression: { followUpRequired: true },
      background: true,
    },
  ],
]);

module.exports = buildModel('Inquiry', inquirySchema, 'inquiries');
