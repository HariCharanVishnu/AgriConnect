const Crop = require('../models/Crop');
const User = require('../models/User');

// Helper: Find agent in same region
async function findAgentByRegion(region) {
  return await User.findOne({ role: 'agent', region });
}

// Farmer registers a new crop
exports.registerCrop = async (req, res) => {
  try {
    const { name, acres, cultivationStartDate, preferredLanguage, typeOfSoil, age, gender, phone, address, endDate, quantity, price } = req.body;
// ... existing code ...
const crop = new Crop({
  farmer: farmerId,
  name,
  acres,
  cultivationStartDate,
  preferredLanguage,
  typeOfSoil,
  agent: agent ? agent._id : null,
  farmerDetails: { age, gender, phone, address },
  endDate,
  quantity,
  price
});

    await crop.save();

    // Generate unique Farmer ID (for demo, use crop._id)
    res.status(201).json({ message: 'Crop registered', cropId: crop._id, assignedAgent: agent ? agent.name : null });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Farmer views their crops
exports.getMyCrops = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const crops = await Crop.find({ farmer: req.user.userId })
      .populate('agent', 'name email phone region')
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};