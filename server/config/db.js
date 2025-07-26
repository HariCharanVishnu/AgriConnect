const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use default MongoDB URI instead of environment variable
    const mongoURI = 'mongodb://localhost:27017/sap-project';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🔗 URI: ${mongoURI}`);
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('💡 Make sure MongoDB is running locally');
    console.log('🔧 For local development, you can use: mongodb://localhost:27017/sap-project');
    process.exit(1);
  }
};

module.exports = connectDB;
