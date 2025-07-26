# SAP Project - Complete Setup Guide

## 🚀 Quick Start (No .env file needed!)

### Prerequisites
- Node.js (version 16 or higher)
- MongoDB (local installation)

### Step 1: Install MongoDB
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will run on `mongodb://localhost:27017`

### Step 2: Start Backend Server
**Option A: Use the batch file**
```bash
start-backend.bat
```

**Option B: Manual commands**
```bash
cd server
npm install
npm start
```

**Expected output:**
```
🚀 Server running on port 5000
📱 Frontend URL: http://localhost:5173
🔗 Demo users page: http://localhost:5000/create-demo-users
```

### Step 3: Create Demo Users
**Option A: Use the batch file**
```bash
create-demo-users.bat
```

**Option B: Manual command**
```bash
curl -X POST http://localhost:5000/api/auth/create-demo-users
```

**Option C: Visit the web page**
- Go to: http://localhost:5000/create-demo-users
- Click "Create Demo Users" button

### Step 4: Start Frontend
**Option A: Use the batch file**
```bash
start-frontend.bat
```

**Option B: Manual commands**
```bash
cd frontend
npm install
npm run dev
```

**Expected output:**
```
Local:   http://localhost:5173/
```

### Step 5: Test the Application
1. Visit: http://localhost:5173
2. You should see the SAP Project login page
3. Login with demo credentials:
   - **Farmer**: `farmer@example.com` / `password123`
   - **Agent**: `agent@example.com` / `password123`
   - **Admin**: `admin@example.com` / `password123`

## 🔧 What's Fixed

### ✅ Backend Issues Fixed:
- Removed dependency on .env file
- Using default MongoDB URI: `mongodb://localhost:27017/sap-project`
- Using default JWT secret: `sap-project-super-secret-jwt-key-2024`
- Using default port: 5000
- Fixed CORS configuration for frontend

### ✅ Frontend Issues Fixed:
- Fixed AuthContext.jsx (was corrupted with backend code)
- Proper React context implementation
- Correct routing configuration
- Should now show SAP Project login page instead of default Vite page

### ✅ Database Issues Fixed:
- Using local MongoDB instead of cloud
- No environment variables needed
- Automatic demo user creation

## 🐛 Troubleshooting

### If MongoDB connection fails:
1. Make sure MongoDB is installed and running
2. Check if MongoDB service is started
3. Try restarting MongoDB service

### If frontend shows default Vite page:
1. Make sure you're running from the frontend directory
2. Check browser console for errors
3. Clear browser cache and reload

### If login fails:
1. Make sure demo users are created
2. Check if backend is running on port 5000
3. Verify the API endpoint: http://localhost:5000

## 📱 Application URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Demo Users Page**: http://localhost:5000/create-demo-users
- **API Health Check**: http://localhost:5000

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Farmer | farmer@example.com | password123 |
| Agent | agent@example.com | password123 |
| Admin | admin@example.com | password123 |

## 🛠️ File Structure

```
SAP-Project/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Authentication context
│   │   ├── pages/
│   │   │   ├── Login.jsx  # Login page
│   │   │   ├── farmer/    # Farmer pages
│   │   │   ├── agent/     # Agent pages
│   │   │   └── admin/     # Admin pages
│   │   └── routes/
│   │       └── AppRoutes.jsx  # Application routes
│   └── package.json
├── server/                # Node.js backend
│   ├── app.js            # Main server file
│   ├── config/
│   │   └── db.js         # Database configuration
│   ├── controllers/      # API controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── package.json
├── start-backend.bat     # Backend startup script
├── start-frontend.bat    # Frontend startup script
├── create-demo-users.bat # Demo users creation script
└── SETUP_GUIDE.md        # This file
```

## 🎯 Expected Behavior

1. **Backend starts** without any .env file dependency
2. **Frontend shows** SAP Project login page (not default Vite page)
3. **Demo users** can be created automatically
4. **Login works** with provided credentials
5. **Role-based dashboards** load correctly

---

**Happy coding! 🚀** 