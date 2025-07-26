const Media = require('../models/Media');
const Crop = require('../models/Crop');
const User = require('../models/User');

// Farmer uploads media
exports.uploadMedia = async (req, res) => {
  try {
    const { description } = req.body;
    const farmerId = req.user.userId;
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type. Allowed: JPEG, PNG, GIF, MP4, AVI, PDF' });
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return res.status(400).json({ message: 'File size too large. Maximum 10MB allowed.' });
    }

    // Find assigned agent (from any crop)
    const crop = await Crop.findOne({ farmer: farmerId }).populate('agent');
    const agent = crop ? crop.agent : null;

    // Determine file type
    let fileType = 'image';
    if (file.mimetype.startsWith('video/')) {
      fileType = 'video';
    } else if (file.mimetype === 'application/pdf') {
      fileType = 'pdf';
    }

    const media = new Media({
      farmer: farmerId,
      agent: agent ? agent._id : null,
      description,
      fileUrl: file.path, // For local, use file.path; for cloud, use file.url
      fileType,
      fileName: file.originalname,
      fileSize: file.size
    });

    await media.save();
    res.status(201).json({ 
      message: 'Media uploaded successfully', 
      mediaId: media._id,
      fileName: file.originalname,
      fileSize: file.size
    });
  } catch (err) {
    console.error('Media upload error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Agent views media uploads from assigned farmers
exports.getAgentMedia = async (req, res) => {
  try {
    const agentId = req.user.userId;
    const media = await Media.find({ agent: agentId })
      .populate('farmer', 'name phone')
      .sort({ createdAt: -1 });
    res.json(media);
  } catch (err) {
    console.error('Get agent media error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};