const mongoose = require('mongoose');

function buildModel(name, schema, collectionName) {
  return mongoose.models[name] || mongoose.model(name, schema, collectionName);
}

module.exports = buildModel;
