const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Property = require('../models/Property');

// Set up Multer for local storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  }
});

const upload = multer({ storage: storage });

// @route   POST /api/admin/properties
// @desc    Add a new property with images
router.post('/properties', upload.array('images', 10), async (req, res) => {
  try {
    const { title, description, price, location, type, status, bedrooms, bathrooms, area } = req.body;
    
    // Extracted image paths
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

    const newProperty = new Property({
      title,
      description,
      price,
      location,
      type,
      status,
      bedrooms,
      bathrooms,
      area,
      images: imagePaths
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error('Error adding property:', error);
    res.status(500).json({ error: 'Failed to add property' });
  }
});

// @route   GET /api/admin/properties
// @desc    Get all properties
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

module.exports = router;
