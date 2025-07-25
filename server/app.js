const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
// ... existing code ...
const authRoutes = require('./routes/auth');
// ... existing code ...
app.use('/api/auth', authRoutes);
// ... existing code ...

app.get('/', (req, res) => {
  res.send('API is running...');
});

const cropRoutes = require('./routes/crop');
app.use('/api/crop', cropRoutes);


const agentRoutes = require('./routes/agent');
app.use('/api/agent', agentRoutes);


const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
const aiRoutes = require('./routes/ai');
app.use('/api/ai', aiRoutes);

const notificationRoutes = require('./routes/notification');
app.use('/api/notification', notificationRoutes);

const mediaRoutes = require('./routes/media');
app.use('/api/media', mediaRoutes);

// Serve uploaded files statically (for local dev)
app.use('/uploads', express.static('uploads'));

const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));