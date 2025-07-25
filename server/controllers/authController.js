const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password, role, region } = req.body;
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, password: hashedPassword, role, region });
    await user.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user._id, name: user.name, role: user.role, region: user.region } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password, role, region } = req.body;
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    let farmerId = undefined;
    if (role === 'farmer') {
      // Generate custom Farmer ID: FARM-YYYY-XXXX
      const year = new Date().getFullYear();
      const lastFarmer = await User.findOne({ role: 'farmer' }).sort({ createdAt: -1 });
      let nextId = 1;
      if (lastFarmer && lastFarmer.farmerId) {
        const lastNum = parseInt(lastFarmer.farmerId.split('-')[2]);
        nextId = lastNum + 1;
      }
      farmerId = `FARM-${year}-${String(nextId).padStart(4, '0')}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, password: hashedPassword, role, region, farmerId });
    await user.save();

    res.status(201).json({ message: 'Signup successful', farmerId: user.farmerId });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true });
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};