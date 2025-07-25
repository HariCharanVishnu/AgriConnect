const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPayment, getFarmerPayments, getAgentPayments } = require('../controllers/paymentController');

// Agent creates payment for a crop
router.post('/create', auth('agent'), createPayment);

// Farmer views their payments
router.get('/farmer', auth('farmer'), getFarmerPayments);

// Agent views payments for their assigned crops
router.get('/agent', auth('agent'), getAgentPayments);

module.exports = router;