const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');
const Notification = require('../models/Notification');
const Crop = require('../models/Crop');

// AI crop prediction with notification to farmer
router.post('/crop-predict', auth(['agent', 'admin']), async (req, res) => {
  try {
    const { cropId } = req.body;
    
    if (!cropId) {
      return res.status(400).json({ message: 'Crop ID is required' });
    }

    // Find the crop and farmer
    const crop = await Crop.findById(cropId).populate('farmer');
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Call AI service
    const response = await axios.post('http://localhost:5001/predict', req.body);

    // Send notification to farmer
    if (crop.farmer) {
      const notification = new Notification({
        to: crop.farmer._id,
        from: req.user.userId,
        message: `AI Prediction: ${response.data.prediction || 'Analysis completed'}`,
        type: 'prediction'
      });
      await notification.save();
    }

    res.json({
      ...response.data,
      message: 'Prediction sent to farmer as notification'
    });
  } catch (err) {
    console.error('AI prediction error:', err);
    if (err.code === 'ECONNREFUSED') {
      res.status(503).json({ message: 'AI service is not available' });
    } else {
      res.status(500).json({ message: 'AI service error', error: err.message });
    }
  }
});

module.exports = router;