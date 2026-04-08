const mongoose = require('mongoose');
const applyIndexes = require('./shared/applyIndexes');
const buildModel = require('./shared/buildModel');
const { DEFAULT_SCHEMA_OPTIONS } = require('./shared/schemaOptions');
const { SUBSCRIPTION_PLANS, VERIFICATION_STATUSES } = require('./shared/enums');
const { kycDetailsSchema, verificationDocumentSchema } = require('./schemas/profileSchemas');

const sellerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    verificationStatus: {
      type: String,
      enum: VERIFICATION_STATUSES,
      default: VERIFICATION_STATUSES[0],
    },
    verificationDocuments: [verificationDocumentSchema],
    kycDetails: {
      type: kycDetailsSchema,
      default: () => ({}),
    },
    activeListings: {
      type: Number,
      default: 0,
      min: 0,
    },
    soldProperties: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
      min: 0,
    },
    avgResponseTime: {
      type: Number,
      default: 0,
      min: 0,
    },
    responseRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    subscriptionPlan: {
      type: String,
      enum: SUBSCRIPTION_PLANS,
      default: SUBSCRIPTION_PLANS[0],
    },
    subscriptionExpiresAt: Date,
    listingCredits: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  DEFAULT_SCHEMA_OPTIONS
);

applyIndexes(sellerProfileSchema, [
  [{ userId: 1 }, { unique: true, background: true }],
  [{ verificationStatus: 1 }, { background: true }],
  [{ rating: -1 }, { background: true }],
  [{ subscriptionExpiresAt: 1 }, { background: true }],
]);

module.exports = buildModel('SellerProfile', sellerProfileSchema, 'sellerProfiles');
