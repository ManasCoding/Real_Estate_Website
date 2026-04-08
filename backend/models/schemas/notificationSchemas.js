const mongoose = require('mongoose');
const { DELIVERY_STATUSES } = require('../shared/enums');
const { SUBDOCUMENT_SCHEMA_OPTIONS } = require('../shared/schemaOptions');

const relatedEntitySchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      trim: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

const deliveryStatusSchema = new mongoose.Schema(
  {
    push: { type: String, enum: DELIVERY_STATUSES, default: DELIVERY_STATUSES[0] },
    email: { type: String, enum: DELIVERY_STATUSES, default: DELIVERY_STATUSES[0] },
    sms: { type: String, enum: DELIVERY_STATUSES, default: DELIVERY_STATUSES[0] },
    in_app: { type: String, enum: DELIVERY_STATUSES, default: DELIVERY_STATUSES[0] },
  },
  SUBDOCUMENT_SCHEMA_OPTIONS
);

module.exports = {
  deliveryStatusSchema,
  relatedEntitySchema,
};
