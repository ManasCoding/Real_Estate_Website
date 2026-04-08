const mongoose = require('mongoose');
const applyIndexes = require('./shared/applyIndexes');
const buildModel = require('./shared/buildModel');
const { DEFAULT_SCHEMA_OPTIONS } = require('./shared/schemaOptions');
const {
  AGENT_SUBSCRIPTION_TIERS,
  SPECIALIZATIONS,
  VERIFICATION_STATUSES,
} = require('./shared/enums');
const {
  agencySchema,
  agentStatsSchema,
  commissionStructureSchema,
  serviceAreaSchema,
  workingHourSchema,
} = require('./schemas/profileSchemas');

const agentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    licenseNumber: {
      type: String,
      trim: true,
    },
    licenseExpiryDate: Date,
    licenseState: {
      type: String,
      trim: true,
    },
    licenseVerified: {
      type: Boolean,
      default: false,
    },
    agency: {
      type: agencySchema,
      default: () => ({}),
    },
    experience: {
      type: Number,
      min: 0,
    },
    specialization: [
      {
        type: String,
        enum: SPECIALIZATIONS,
      },
    ],
    certifications: [
      {
        type: String,
        trim: true,
      },
    ],
    serviceAreas: [serviceAreaSchema],
    commissionStructure: {
      type: commissionStructureSchema,
      default: () => ({}),
    },
    stats: {
      type: agentStatsSchema,
      default: () => ({}),
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
    responseRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    avgResponseTime: {
      type: Number,
      default: 0,
      min: 0,
    },
    managedProperties: {
      type: Number,
      default: 0,
      min: 0,
    },
    activeListings: {
      type: Number,
      default: 0,
      min: 0,
    },
    verificationStatus: {
      type: String,
      enum: VERIFICATION_STATUSES,
      default: VERIFICATION_STATUSES[0],
    },
    verifiedAt: Date,
    verificationDocuments: [
      {
        type: String,
        trim: true,
      },
    ],
    subscriptionTier: {
      type: String,
      enum: AGENT_SUBSCRIPTION_TIERS,
      default: AGENT_SUBSCRIPTION_TIERS[0],
    },
    subscriptionExpiresAt: Date,
    featuredListingCredits: {
      type: Number,
      default: 0,
      min: 0,
    },
    workingHours: [workingHourSchema],
    onLeave: {
      type: Boolean,
      default: false,
    },
    leaveUntil: Date,
  },
  DEFAULT_SCHEMA_OPTIONS
);

applyIndexes(agentProfileSchema, [
  [{ userId: 1 }, { unique: true, background: true }],
  [{ licenseNumber: 1 }, { unique: true, sparse: true, background: true }],
  [{ 'serviceAreas.city': 1, specialization: 1 }, { background: true }],
  [{ rating: -1, totalReviews: -1 }, { background: true }],
  [{ verificationStatus: 1 }, { background: true }],
  [{ subscriptionExpiresAt: 1 }, { background: true }],
  [{ 'serviceAreas.coordinates': '2dsphere' }, { background: true }],
]);

module.exports = buildModel('AgentProfile', agentProfileSchema, 'agentProfiles');
