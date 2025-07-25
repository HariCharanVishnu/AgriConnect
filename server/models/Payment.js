const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  crop: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', required: true },
  estimatedCost: { type: Number, required: true },
  serviceFee: { type: Number, required: true },
  profitShare: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);