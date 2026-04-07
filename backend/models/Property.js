const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Apartment', 'House', 'Villa', 'Commercial'],
    default: 'Apartment'
  },
  status: {
    type: String,
    enum: ['For Sale', 'For Rent'],
    default: 'For Sale'
  },
  bedrooms: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },
  area: {
    type: Number, // in sqft or sqm
  },
  images: [{
    type: String, // Store URLs/paths to the images locally
  }]
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
