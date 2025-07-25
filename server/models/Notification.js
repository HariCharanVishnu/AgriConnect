const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // agent/admin
  message: { type: String, required: true },
  type: { type: String, enum: ['alert', 'prediction', 'recommendation', 'general'], default: 'general' },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', notificationSchema);