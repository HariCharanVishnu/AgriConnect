const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  acres: { type: Number, required: true },
  cultivationStartDate: { type: Date, required: true },
  preferredLanguage: { type: String },
  typeOfSoil: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // assigned agent
  farmerDetails: {
    age: Number,
    gender: String,
    phone: String,
    address: String
  },
  rejectionReason: { type: String },
  endDate: { type: Date },
  quantity: { type: Number },
  price: { type: Number },
  liveStatus: { type: String, enum: ['active', 'completed', 'failed'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Crop', cropSchema);