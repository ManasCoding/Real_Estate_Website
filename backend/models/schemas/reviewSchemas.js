const mongoose = require('mongoose');
const { SUBDOCUMENT_SCHEMA_OPTIONS } = require('../shared/schemaOptions');
const { halfStepRatingValidator } = require('../shared/validators');

const detailedRatingsSchema = new mongoose.Schema(
  {
    professionalism: { type: Number, validate: halfStepRatingValidator },
    responsiveness: { type: Number, validate: halfStepRatingValidator },
    knowledge: { type: Number, validate: halfStepRatingValidator },
    negotiation: { type: Number, validate: halfStepRatingValidator },
    overall: { type: Number, validate: halfStepRatingValidator },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const reviewResponseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    message: {
      type: String,
      trim: true,
    },
    respondedAt: Date,
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

module.exports = {
  detailedRatingsSchema,
  reviewResponseSchema,
};
