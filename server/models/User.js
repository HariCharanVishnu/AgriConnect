const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // ... existing code ...
farmerId: { type: String, unique: true }, // Add this line
// ... existing code ...
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['farmer', 'agent', 'admin'], required: true },
  region: { type: String }, // For farmer/agent
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);