const mongoose = require('mongoose');
const { SUBDOCUMENT_SCHEMA_OPTIONS } = require('../shared/schemaOptions');
const { pointCoordinatesValidator } = require('../shared/validators');

const pointSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: undefined,
      validate: pointCoordinatesValidator,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

module.exports = {
  pointSchema,
};
