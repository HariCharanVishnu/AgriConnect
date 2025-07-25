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

    // Find assigned agent (from any crop)
    const crop = await Crop.findOne({ farmer: farmerId }).populate('agent');
    const agent = crop ? crop.agent : null;

    const media = new Media({
      farmer: farmerId,
      agent: agent ? agent._id : null,
      description,
      fileUrl: file.path, // For local, use file.path; for cloud, use file.url
      fileType: file.mimetype.startsWith('video') ? 'video' : 'image'
    });

    await media.save();
    res.status(201).json({ message: 'Media uploaded', mediaId: media._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Agent views media uploads from assigned farmers
exports.getAgentMedia = async (req, res) => {
  try {
    const agentId = req.user.userId;
    const media = await Media.find({ agent: agentId }).populate('farmer', 'name phone');
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};