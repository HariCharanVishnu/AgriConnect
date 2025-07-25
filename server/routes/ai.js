const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');

// Proxy to Python AI service
router.post('/crop-predict', auth(['agent', 'admin']), async (req, res) => {
  try {
    const response = await axios.post('http://localhost:5001/predict', req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'AI service error', error: err.message });
  }
});
const Notification = require('../models/Notification');
const Crop = require('../models/Crop');
const User = require('../models/User');

router.post('/crop-predict', auth(['agent', 'admin']), async (req, res) => {
  try {
    const { cropId } = req.body;
    const response = await axios.post('http://localhost:5001/predict', req.body);

    // Find the crop and farmer
    const crop = await Crop.findById(cropId).populate('farmer');
    if (crop && crop.farmer) {
      // Send notification to farmer
      const notification = new Notification({
        to: crop.farmer._id,
        from: req.user.userId,
        message: `AI Prediction: ${response.data.prediction}`,
        type: 'prediction'
      });
      await notification.save();
    }

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'AI service error', error: err.message });
  }
});

module.exports = router;