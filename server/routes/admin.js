const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  getAgents, 
  getAnnualRevenue, 
  getCropDistribution, 
  getRegionRevenue 
} = require('../controllers/adminController');

// Only admin can access
router.get('/agents', auth('admin'), getAgents);
router.get('/analytics/annual-revenue', auth('admin'), getAnnualRevenue);
router.get('/analytics/crop-distribution', auth('admin'), getCropDistribution);
router.get('/analytics/region-revenue', auth('admin'), getRegionRevenue);

module.exports = router;