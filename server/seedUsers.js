const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    await connectDB();

    // Check if users already exist
    const existingUsers = await User.find({
      $or: [
        { email: 'farmer@example.com' },
        { email: 'agent@example.com' },
        { email: 'admin@example.com' }
      ]
    });

    if (existingUsers.length > 0) {
      console.log('Demo users already exist in the database.');
      console.log('Existing users:', existingUsers.map(u => ({ email: u.email, role: u.role })));
      process.exit(0);
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
        region: 'Andhra Pradesh'
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

    console.log('✅ Demo users created successfully:');
    createdUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
    });

    console.log('\n📝 Login Credentials:');
    console.log('Farmer: farmer@example.com / password123');
    console.log('Agent: agent@example.com / password123');
    console.log('Admin: admin@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();