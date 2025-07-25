const Crop = require('../models/Crop');
const User = require('../models/User');

// View new crop registrations in agent's region (pending)
exports.getPendingCrops = async (req, res) => {
  try {
    const agent = await User.findById(req.user.userId);
    const crops = await Crop.find({ agent: agent._id, status: 'pending' }).populate('farmer', 'name phone region');
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve a crop registration
exports.approveCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.cropId);
    if (!crop) return res.status(404).json({ message: 'Crop not found' });
    if (String(crop.agent) !== req.user.userId) return res.status(403).json({ message: 'Not authorized' });

    crop.status = 'approved';
    crop.rejectionReason = undefined;
    await crop.save();
    res.json({ message: 'Crop approved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Reject a crop registration (with reason)
exports.rejectCrop = async (req, res) => {
  try {
    const { reason } = req.body;
    const crop = await Crop.findById(req.params.cropId);
    if (!crop) return res.status(404).json({ message: 'Crop not found' });
    if (String(crop.agent) !== req.user.userId) return res.status(403).json({ message: 'Not authorized' });

    crop.status = 'rejected';
    crop.rejectionReason = reason;
    await crop.save();
    res.json({ message: 'Crop rejected' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// View all assigned farmers (with filters)
exports.getFarmers = async (req, res) => {
  try {
    const agent = await User.findById(req.user.userId);
    // Find all crops assigned to this agent
    let query = { agent: agent._id };
    if (req.query.cropName) query.name = req.query.cropName;
    if (req.query.farmerId) query.farmer = req.query.farmerId;

    const crops = await Crop.find(query).populate('farmer', 'name phone region');
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};