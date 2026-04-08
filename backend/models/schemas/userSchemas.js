const mongoose = require('mongoose');
const { AUTH_PROVIDERS } = require('../shared/enums');
const { SUBDOCUMENT_SCHEMA_OPTIONS } = require('../shared/schemaOptions');
const { emailRegex } = require('../shared/validators');

const oauthProviderSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      enum: AUTH_PROVIDERS.filter((provider) => provider !== 'local'),
      required: true,
    },
    providerId: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator(value) {
          return value === undefined || value === null || emailRegex.test(value);
        },
        message: 'OAuth provider email is invalid.',
      },
    },
    connectedAt: {
      type: Date,
      default: Date.now,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

module.exports = {
  oauthProviderSchema,
};
