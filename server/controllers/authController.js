const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password, role, region } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

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
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    
    // Validate required fields
    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: 'Email/Phone and password are required' });
    }

    const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Use default JWT secret instead of environment variable
    const jwtSecret = 'sap-project-super-secret-jwt-key-2024';
    
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        role: user.role, 
        region: user.region,
        farmerId: user.farmerId 
      } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createDemoUsers = async (req, res) => {
  try {
    // Check if demo users already exist
    const existingUsers = await User.find({
      $or: [
        { email: 'farmer@example.com' },
        { email: 'agent@example.com' },
        { email: 'admin@example.com' }
      ]
    });

    if (existingUsers.length > 0) {
      return res.json({ 
        message: 'Demo users already exist', 
        users: existingUsers.map(u => ({ email: u.email, role: u.role, name: u.name }))
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create demo users
    const demoUsers = [
      {
        name: 'Demo Farmer',
        email: 'farmer@example.com',
        phone: '9876543210',
        password: hashedPassword,
        role: 'farmer',
        region: 'Andhra Pradesh',
        farmerId: 'FARM-2024-0001'
      },
      {
        name: 'Demo Agent',
        email: 'agent@example.com',
        phone: '9876543211',
        password: hashedPassword,
        role: 'agent',
        region: 'Andhra Pradesh'
      },
      {
        name: 'Demo Admin',
        email: 'admin@example.com',
        phone: '9876543212',
        password: hashedPassword,
        role: 'admin',
        region: 'All India'
      }
    ];

    // Insert users
    const createdUsers = await User.insertMany(demoUsers);

    res.json({ 
      message: 'Demo users created successfully',
      users: createdUsers.map(u => ({ email: u.email, role: u.role, name: u.name })),
      credentials: {
        farmer: 'farmer@example.com / password123',
        agent: 'agent@example.com / password123',
        admin: 'admin@example.com / password123'
      }
    });
  } catch (error) {
    console.error('Error creating demo users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true });
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};