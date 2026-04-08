const DEFAULT_SCHEMA_OPTIONS = {
  timestamps: true,
  versionKey: false,
  autoIndex: true,
};

const SUBDOCUMENT_SCHEMA_OPTIONS = {
  _id: false,
  id: false,
};

const CREATED_ONLY_SCHEMA_OPTIONS = {
  timestamps: { createdAt: true, updatedAt: false },
  versionKey: false,
  autoIndex: true,
};

const NO_TIMESTAMPS_SCHEMA_OPTIONS = {
  versionKey: false,
  autoIndex: true,
};

module.exports = {
  CREATED_ONLY_SCHEMA_OPTIONS,
  DEFAULT_SCHEMA_OPTIONS,
  NO_TIMESTAMPS_SCHEMA_OPTIONS,
  SUBDOCUMENT_SCHEMA_OPTIONS,
};
