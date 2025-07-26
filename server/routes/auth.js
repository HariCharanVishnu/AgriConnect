const express = require('express');
const router = express.Router();
const { signup, login, updateProfile, createDemoUsers } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.put('/update-profile', updateProfile);
router.post('/create-demo-users', createDemoUsers);

module.exports = router;