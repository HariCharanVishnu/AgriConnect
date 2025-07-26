const User = require('../models/User');
const Crop = require('../models/Crop');
const Payment = require('../models/Payment');

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
    console.error('Get agents error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Bar chart: annual revenue trends
exports.getAnnualRevenue = async (req, res) => {
  try {
    const payments = await Payment.aggregate([
      {
        $group: {
          _id: { $year: "$createdAt" },
          revenue: { $sum: "$total" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    const revenueData = payments.map(p => ({
      year: p._id,
      revenue: p.revenue
    }));
    
    res.json(revenueData);
  } catch (err) {
    console.error('Get annual revenue error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Pie chart: crop-wise farmer distribution
exports.getCropDistribution = async (req, res) => {
  try {
    const crops = await Crop.aggregate([
      { $group: { _id: "$name", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(crops);
  } catch (err) {
    console.error('Get crop distribution error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Region-wise revenue
exports.getRegionRevenue = async (req, res) => {
  try {
    const payments = await Payment.aggregate([
      {
        $lookup: {
          from: 'crops',
          localField: 'crop',
          foreignField: '_id',
          as: 'cropData'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'cropData.farmer',
          foreignField: '_id',
          as: 'farmerData'
        }
      },
      {
        $group: {
          _id: { $arrayElemAt: ['$farmerData.region', 0] },
          revenue: { $sum: '$total' }
        }
      },
      { $sort: { revenue: -1 } }
    ]);
    
    const regionData = payments.map(p => ({
      region: p._id || 'Unknown',
      revenue: p.revenue
    }));
    
    res.json(regionData);
  } catch (err) {
    console.error('Get region revenue error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};