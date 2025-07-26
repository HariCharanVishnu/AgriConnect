const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // assigned agent
  description: { type: String },
  fileUrl: { type: String, required: true },
  fileType: { type: String, enum: ['image', 'video', 'pdf', 'document'], required: true },
  fileName: { type: String },
  fileSize: { type: Number }, // in bytes
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', mediaSchema);