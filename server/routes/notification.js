const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { sendNotification, getMyNotifications } = require('../controllers/notificationController');

// Agent/Admin sends notification to farmer
router.post('/send', auth(['agent', 'admin']), sendNotification);

// Farmer views their notifications
router.get('/my', auth('farmer'), getMyNotifications);

module.exports = router;