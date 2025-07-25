const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { registerCrop, getMyCrops } = require('../controllers/cropController');

// Only farmers can register crops
router.post('/register', auth('farmer'), registerCrop);

// Farmer views their crops
router.get('/my', auth('farmer'), getMyCrops);

module.exports = router;