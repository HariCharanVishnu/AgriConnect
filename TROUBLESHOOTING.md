# SAP Project - Troubleshooting Guide

This guide helps you resolve common issues when setting up and running the SAP Project.

## 🚨 Common Issues and Solutions

### 1. Server Won't Start

**Problem**: Server fails to start or crashes immediately.

**Solutions**:
1. **Check if .env file exists**:
   ```bash
   # In server directory
   ls -la .env
   # If not exists, create it:
   cp env-template.txt .env
   ```

2. **Check MongoDB connection**:
   - Ensure MongoDB is running
   - For local MongoDB: `mongod`
   - For MongoDB Atlas: Check connection string

3. **Check port availability**:
   ```bash
   # Check if port 5000 is in use
   netstat -ano | findstr :5000
   ```

4. **Use startup scripts**:
   ```bash
   # Windows (PowerShell)
   .\start.ps1
   
   # Windows (Command Prompt)
   start.bat
   ```

### 2. Database Connection Issues

**Problem**: "MongoDB Connection Error" or "Cannot connect to database"

**Solutions**:
1. **Local MongoDB**:
   ```bash
   # Install MongoDB locally
   # Start MongoDB service
   mongod
   ```

2. **MongoDB Atlas**:
   - Create account at MongoDB Atlas
   - Create cluster
   - Get connection string
   - Update MONGO_URI in .env

3. **Check .env file**:
   ```env
   MONGO_URI=mongodb://localhost:27017/sap-project
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

### 3. Frontend Can't Connect to Backend

**Problem**: "Network Error" or "Cannot connect to API"

**Solutions**:
1. **Check if backend is running**:
   - Visit: http://localhost:5000
   - Should show: "SAP Project API is running..."

2. **Check CORS settings**:
   - Backend CORS is configured for http://localhost:5173
   - Frontend runs on http://localhost:5173

3. **Check axios configuration**:
   - Frontend axios baseURL: http://localhost:5000/api
   - Ensure backend is on port 5000

### 4. Login Issues

**Problem**: "Login failed" or "Invalid credentials"

**Solutions**:
1. **Create demo users first**:
   - Visit: http://localhost:5000/create-demo-users
   - Click "Create Demo Users" button

2. **Use correct credentials**:
   ```
   Farmer: farmer@example.com / password123
   Agent: agent@example.com / password123
   Admin: admin@example.com / password123
   ```

3. **Check JWT_SECRET**:
   - Ensure JWT_SECRET is set in .env file
   - Server will use fallback if not set

### 5. File Upload Issues

**Problem**: "File upload failed" or "Invalid file type"

**Solutions**:
1. **Check file size**: Maximum 10MB
2. **Check file type**: Only JPEG, PNG, GIF, MP4, AVI, PDF
3. **Check uploads directory**: Should be created automatically

### 6. Environment Variables Issues

**Problem**: "JWT_SECRET is not defined" or similar

**Solutions**:
1. **Create .env file**:
   ```bash
   cd server
   cp env-template.txt .env
   ```

2. **Check .env content**:
   ```env
   MONGO_URI=mongodb://localhost:27017/sap-project
   JWT_SECRET=sap-project-super-secret-jwt-key-2024
   PORT=5000
   CORS_ORIGIN=http://localhost:5173
   ```

### 7. PowerShell/Command Line Issues

**Problem**: "&& is not recognized" or command syntax errors

**Solutions**:
1. **Use separate commands**:
   ```powershell
   cd server
   npm install
   npm start
   ```

2. **Use startup scripts**:
   ```powershell
   # PowerShell
   .\start.ps1
   
   # Command Prompt
   start.bat
   ```

## 🔧 Step-by-Step Setup Guide

### Complete Setup Process:

1. **Clone/Download the project**
2. **Set up Backend**:
   ```bash
   cd server
   # Create .env file
   copy env-template.txt .env
   # Install dependencies
   npm install
   # Start server
   npm start
   ```

3. **Create Demo Users**:
   - Visit: http://localhost:5000/create-demo-users
   - Click "Create Demo Users"

4. **Set up Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Test the Application**:
   - Visit: http://localhost:5173
   - Login with demo credentials

## 🐛 Debugging Tips

### Backend Debugging:
1. **Check server logs** for error messages
2. **Test API endpoints** with Postman or curl
3. **Check database connection** in MongoDB Compass

### Frontend Debugging:
1. **Open browser DevTools** (F12)
2. **Check Console tab** for errors
3. **Check Network tab** for API calls
4. **Check Application tab** for localStorage

### Database Debugging:
1. **Use MongoDB Compass** to view data
2. **Check collections**: users, crops, payments, etc.
3. **Verify demo users** exist in database

## 📋 Checklist

Before reporting issues, ensure:

- [ ] MongoDB is running
- [ ] .env file exists in server directory
- [ ] All dependencies are installed (npm install)
- [ ] Backend server is running on port 5000
- [ ] Frontend is running on port 5173
- [ ] Demo users are created
- [ ] No firewall blocking ports
- [ ] Node.js version is 16 or higher

## 🆘 Getting Help

If you're still having issues:

1. **Check the logs** for specific error messages
2. **Try the startup scripts** (start.ps1 or start.bat)
3. **Verify all prerequisites** are installed
4. **Check the README.md** for detailed setup instructions

## 🔄 Reset Everything

If you want to start fresh:

1. **Delete node_modules and reinstall**:
   ```bash
   cd server
   rmdir /s node_modules
   npm install
   ```

2. **Clear database**:
   - Delete the database in MongoDB
   - Recreate demo users

3. **Clear frontend cache**:
   ```bash
   cd frontend
   rmdir /s node_modules
   npm install
   ```

---

**Still having issues?** Check the server console and browser console for specific error messages and provide them for better assistance. 