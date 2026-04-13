const mongoose = require('mongoose');
const applyIndexes = require('./shared/applyIndexes');
const buildModel = require('./shared/buildModel');
const { DEFAULT_SCHEMA_OPTIONS } = require('./shared/schemaOptions');
const { AUTH_PROVIDERS, LANGUAGES, USER_ROLES } = require('./shared/enums');
const { emailRegex, nonEmptyArrayValidator } = require('./shared/validators');
const { oauthProviderSchema } = require('./schemas/userSchemas');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator(value) {
          return emailRegex.test(value);
        },
        message: 'Email must be a valid email address.',
      },
    },
    userRole: [
      {
        type: String,
        enum: USER_ROLES,
        required: true,
      },
    ],
    password: {
      type: String,
      select: false,
    },
    authProvider: {
      type: String,
      enum: AUTH_PROVIDERS,
      default: AUTH_PROVIDERS[0],
    },
    oauthProviders: [oauthProviderSchema],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    suspensionReason: {
      type: String,
      trim: true,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: {
      type: String,
      select: false,
    },
    lastPasswordChange: Date,
    profileImage: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    language: {
      type: String,
      enum: LANGUAGES,
      default: LANGUAGES[0],
    },
    timezone: {
      type: String,
      trim: true,
      default: 'Asia/Kolkata',
    },
    lastLogin: Date,
    loginCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    deviceTokens: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  DEFAULT_SCHEMA_OPTIONS
);

userSchema.path('userRole').validate(nonEmptyArrayValidator('userRole'));

userSchema.pre('validate', async function validateLocalAuth() {
  if (this.authProvider === 'local' && !this.password && this.isNew) {
    this.invalidate('password', 'Password is required for local authentication.');
  }
});

applyIndexes(userSchema, [
  [{ email: 1 }, { unique: true, background: true }],
  [{ phoneNumber: 1 }, { sparse: true, background: true }],
  [{ 'oauthProviders.providerId': 1 }, { sparse: true, background: true }],
  [{ userRole: 1 }, { background: true }],
  [{ isActive: 1, isVerified: 1 }, { background: true }],
  [{ createdAt: -1 }, { background: true }],
]);

module.exports = buildModel('User', userSchema, 'users');
