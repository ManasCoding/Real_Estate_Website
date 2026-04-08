const mongoose = require('mongoose');
const applyIndexes = require('./shared/applyIndexes');
const buildModel = require('./shared/buildModel');
const { DEFAULT_SCHEMA_OPTIONS } = require('./shared/schemaOptions');
const { REVIEW_STATUSES, REVIEW_TYPES, REVIEWER_ROLES } = require('./shared/enums');
const { halfStepRatingValidator } = require('./shared/validators');
const { detailedRatingsSchema, reviewResponseSchema } = require('./schemas/reviewSchemas');

const reviewSchema = new mongoose.Schema(
  {
    reviewType: {
      type: String,
      enum: REVIEW_TYPES,
      required: true,
    },
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewerRole: {
      type: String,
      enum: REVIEWER_ROLES,
      required: true,
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
    transactionId: mongoose.Schema.Types.ObjectId,
    rating: {
      type: Number,
      required: true,
      validate: halfStepRatingValidator,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 4000,
    },
    detailedRatings: {
      type: detailedRatingsSchema,
      default: () => ({}),
    },
    images: [{ type: String, trim: true }],
    videos: [{ type: String, trim: true }],
    helpfulCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    notHelpfulCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    reportCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    verifiedPurchase: {
      type: Boolean,
      default: false,
    },
    response: {
      type: reviewResponseSchema,
      default: undefined,
    },
    status: {
      type: String,
      enum: REVIEW_STATUSES,
      default: REVIEW_STATUSES[0],
    },
    moderatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    moderatedAt: Date,
    moderationReason: {
      type: String,
      trim: true,
    },
  },
  DEFAULT_SCHEMA_OPTIONS
);

applyIndexes(reviewSchema, [
  [{ reviewType: 1, status: 1 }, { background: true }],
  [{ agentId: 1, status: 1 }, { sparse: true, background: true }],
  [{ propertyId: 1, status: 1 }, { sparse: true, background: true }],
  [{ reviewerId: 1, createdAt: -1 }, { background: true }],
]);

module.exports = buildModel('Review', reviewSchema, 'reviews');
