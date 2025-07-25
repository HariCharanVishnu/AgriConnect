const Payment = require('../models/Payment');
const Crop = require('../models/Crop');

// Agent estimates cost and generates bill for a crop
exports.createPayment = async (req, res) => {
  try {
    const { cropId, estimatedCost, finalPrice } = req.body;
    const crop = await Crop.findById(cropId);
    if (!crop) return res.status(404).json({ message: 'Crop not found' });

    // Only assigned agent can create payment
    if (String(crop.agent) !== req.user.userId) return res.status(403).json({ message: 'Not authorized' });

    const serviceFee = estimatedCost * 0.25;
    const profitShare = finalPrice ? finalPrice * 0.15 : 0;
    const total = estimatedCost + serviceFee + profitShare;

    const payment = new Payment({
      farmer: crop.farmer,
      crop: crop._id,
      estimatedCost,
      serviceFee,
      profitShare,
      total
    });

    await payment.save();
    res.status(201).json({ message: 'Payment record created', payment });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Farmer views payment details for their crops
exports.getFarmerPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ farmer: req.user.userId }).populate('crop');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Agent views payments for their assigned crops
exports.getAgentPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate({
      path: 'crop',
      match: { agent: req.user.userId }
    }).populate('farmer');
    // Filter out payments where crop is null (not assigned to this agent)
    res.json(payments.filter(p => p.crop));
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};