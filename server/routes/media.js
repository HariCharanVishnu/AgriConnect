const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const { uploadMedia, getAgentMedia } = require('../controllers/mediaController');

// For local storage (for dev/demo)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Farmer uploads media
router.post('/upload', auth('farmer'), upload.single('file'), uploadMedia);

// Agent views media uploads
router.get('/agent', auth('agent'), getAgentMedia);

module.exports = router;