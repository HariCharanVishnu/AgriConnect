# 🚀 SAP Project - Quick Start Guide

## 📋 Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## 🎯 Quick Setup

### Option 1: Automatic Setup (Windows)
1. Double-click `start-project.bat`
2. Wait for servers to start
3. Open http://localhost:5173

### Option 2: Manual Setup

#### Step 1: Install Dependencies
```bash
# Backend
cd server
npm install

# Frontend  
cd ../frontend
npm install
```

#### Step 2: Setup MongoDB
```bash
# Option A: Local MongoDB
# Start MongoDB service
mongod

# Option B: MongoDB Atlas
# Get connection string from Atlas and set MONGODB_URI environment variable
```

#### Step 3: Create Demo Users
```bash
cd server
node setup-mongodb.js
```

#### Step 4: Start Servers
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🌐 Access URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Test Page**: http://localhost:5173/test

## 👤 Demo Credentials
- **Farmer**: farmer@example.com / password123
- **Agent**: agent@example.com / password123  
- **Admin**: admin@example.com / password123

## 🔧 Troubleshooting

### MongoDB Connection Issues
1. Make sure MongoDB is running: `mongod`
2. Check if port 27017 is available
3. For Atlas: Set MONGODB_URI environment variable

### Frontend Issues
1. Check if port 5173 is available
2. Clear browser cache
3. Check browser console for errors

### Backend Issues
1. Check if port 5000 is available
2. Verify MongoDB connection
3. Check server logs for errors

## 📱 Features
- ✅ User Authentication
- ✅ Role-based Access (Farmer/Agent/Admin)
- ✅ Crop Registration
- ✅ Media Uploads
- ✅ Notifications
- ✅ Payment Tracking
- ✅ Analytics Dashboard

## 🆘 Need Help?
1. Check the test page: http://localhost:5173/test
2. Verify backend is running: http://localhost:5000
3. Check browser console for errors
4. Check server logs for errors 