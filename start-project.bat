@echo off
echo 🚀 Starting SAP Project...
echo.

echo 📦 Installing dependencies...
cd server
call npm install
cd ..

cd frontend
call npm install
cd ..

echo.
echo 🗄️ Setting up MongoDB...
cd server
node setup-mongodb.js
cd ..

echo.
echo 🎯 Starting servers...
echo.
echo 📱 Backend will run on: http://localhost:5000
echo 🌐 Frontend will run on: http://localhost:5173
echo.
echo 📋 Demo Credentials:
echo    Farmer: farmer@example.com / password123
echo    Agent: agent@example.com / password123
echo    Admin: admin@example.com / password123
echo.

echo 🚀 Starting backend server...
start "Backend Server" cmd /k "cd server && npm start"

echo 🚀 Starting frontend server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Both servers are starting...
echo 🌐 Open http://localhost:5173 in your browser
echo.
pause 