const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use MongoDB Atlas or local MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sap-project';
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🔗 URI: ${mongoURI}`);
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('💡 Make sure MongoDB is running locally or Atlas connection is correct');
    console.log('🔧 For local development, you can use: mongodb://localhost:27017/sap-project');
    console.log('🔧 For Atlas, set MONGODB_URI environment variable');
    console.log('🔄 Retrying connection in 5 seconds...');
    
    // Retry connection after 5 seconds
    setTimeout(() => {
      connectDB();
    }, 5000);
  }
};

module.exports = connectDB;
