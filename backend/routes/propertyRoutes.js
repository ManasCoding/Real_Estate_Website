const express = require('express');
const { getPropertyById, listProperties } = require('../controllers/propertyController');

const router = express.Router();

router.get('/', listProperties);
router.get('/:id', getPropertyById);

module.exports = router;
