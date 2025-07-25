const User = require('../models/User');
const Crop = require('../models/Crop');

// View all agents with number of assigned farmers
exports.getAgents = async (req, res) => {
  try {
    // Optionally filter by region
    const region = req.query.region;
    let agentQuery = { role: 'agent' };
    if (region) agentQuery.region = region;

    const agents = await User.find(agentQuery).select('-password');
    // For each agent, count unique farmers assigned via crops
    const agentData = await Promise.all(
      agents.map(async (agent) => {
        const crops = await Crop.find({ agent: agent._id }).populate('farmer');
        const uniqueFarmers = new Set(crops.map(c => String(c.farmer._id)));
        return {
          ...agent.toObject(),
          assignedFarmers: uniqueFarmers.size
        };
      })
    );
    res.json(agentData);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Bar chart: annual revenue trends (dummy, real logic depends on Payment model)
exports.getAnnualRevenue = async (req, res) => {
  // Example: group by year, sum revenue
  // Implement after Payment model is added
  res.json([
    { year: 2022, revenue: 100000 },
    { year: 2023, revenue: 150000 }
  ]);
};

// Pie chart: crop-wise farmer distribution
exports.getCropDistribution = async (req, res) => {
  // Example: group by crop name, count farmers
  const crops = await Crop.aggregate([
    { $group: { _id: "$name", count: { $sum: 1 } } }
  ]);
  res.json(crops);
};

// Region-wise and total company revenue (dummy)
exports.getRegionRevenue = async (req, res) => {
  // Implement after Payment model is added
  res.json([
    { region: "East", revenue: 50000 },
    { region: "West", revenue: 70000 }
  ]);
};