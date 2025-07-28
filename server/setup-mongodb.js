const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const setupMongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/sap-project', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Check if demo users exist
    const existingUsers = await User.find({
      $or: [
        { email: 'farmer@example.com' },
        { email: 'agent@example.com' },
        { email: 'admin@example.com' }
      ]
    });
    
    if (existingUsers.length === 0) {
      console.log('📝 Creating demo users...');
      
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
      
      await User.insertMany(demoUsers);
      console.log('✅ Demo users created successfully!');
      console.log('📋 Login Credentials:');
      console.log('   Farmer: farmer@example.com / password123');
      console.log('   Agent: agent@example.com / password123');
      console.log('   Admin: admin@example.com / password123');
    } else {
      console.log('✅ Demo users already exist');
    }
    
    await mongoose.disconnect();
    console.log('✅ Setup completed successfully!');
    
  } catch (err) {
    console.error('❌ Setup failed:', err.message);
    console.log('💡 Make sure MongoDB is running on localhost:27017');
    console.log('🔧 Start MongoDB with: mongod');
  }
};

setupMongoDB(); 