const Notification = require('../models/Notification');
const User = require('../models/User');

// Agent/Admin sends notification to farmer
exports.sendNotification = async (req, res) => {
  try {
    const { to, message, type } = req.body;
    
    if (!to || !message) {
      return res.status(400).json({ message: 'Recipient and message are required' });
    }

    const recipient = await User.findById(to);
    if (!recipient || recipient.role !== 'farmer') {
      return res.status(400).json({ message: 'Invalid recipient or recipient is not a farmer' });
    }

    const notification = new Notification({
      to,
      from: req.user.userId,
      message,
      type: type || 'general'
    });
    
    await notification.save();
    res.status(201).json({ 
      message: 'Notification sent successfully',
      notificationId: notification._id
    });
  } catch (err) {
    console.error('Send notification error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Farmer views their notifications
exports.getMyNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    
    const notifications = await Notification.find({ to: req.user.userId })
      .populate('from', 'name role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
      
    const total = await Notification.countDocuments({ to: req.user.userId });
    
    res.json({
      notifications,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Get notifications error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};