const express = require('express');
const upload = require('../utils/upload');
const {
  createProperty,
  deleteProperty,
  getPropertyById,
  listProperties,
  updateProperty,
} = require('../controllers/propertyController');

const router = express.Router();

router.get('/properties', listProperties);
router.get('/properties/:id', getPropertyById);
router.post('/properties', upload.array('images', 10), createProperty);
router.put('/properties/:id', upload.array('images', 10), updateProperty);
router.patch('/properties/:id', upload.array('images', 10), updateProperty);
router.delete('/properties/:id', deleteProperty);

module.exports = router;
