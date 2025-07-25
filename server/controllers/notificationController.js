const Notification = require('../models/Notification');
const User = require('../models/User');

// Agent/Admin sends notification to farmer
exports.sendNotification = async (req, res) => {
  try {
    const { to, message, type } = req.body;
    const recipient = await User.findById(to);
    if (!recipient || recipient.role !== 'farmer') return res.status(400).json({ message: 'Invalid recipient' });

    const notification = new Notification({
      to,
      from: req.user.userId,
      message,
      type
    });
    await notification.save();
    res.status(201).json({ message: 'Notification sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Farmer views their notifications
exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ to: req.user.userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};