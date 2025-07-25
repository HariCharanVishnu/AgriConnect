const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getPendingCrops,
  approveCrop,
  rejectCrop,
  getFarmers
} = require('../controllers/agentController');

// Only agents can access these routes
router.get('/pending-crops', auth('agent'), getPendingCrops);
router.post('/approve-crop/:cropId', auth('agent'), approveCrop);
router.post('/reject-crop/:cropId', auth('agent'), rejectCrop);
router.get('/farmers', auth('agent'), getFarmers);

module.exports = router;