const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Connect to database
connectDB();

// Route to serve the demo users creation page
app.get('/create-demo-users', (req, res) => {
  res.sendFile(path.join(__dirname, 'create-demo-users.html'));
});

// API Routes
const authRoutes = require('./routes/auth');
const cropRoutes = require('./routes/crop');
const agentRoutes = require('./routes/agent');
const adminRoutes = require('./routes/admin');
const aiRoutes = require('./routes/ai');
const notificationRoutes = require('./routes/notification');
const mediaRoutes = require('./routes/media');
const paymentRoutes = require('./routes/payment');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/crop', cropRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/payment', paymentRoutes);

// Serve uploaded files statically (for local dev)
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'SAP Project API is running...',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler - place this last
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend URL: http://localhost:5173`);
  console.log(`🔗 Demo users page: http://localhost:${PORT}/create-demo-users`);
  console.log(`🌾 AI Service URL: ${process.env.AI_SERVICE_URL || 'http://localhost:5001'}`);
});