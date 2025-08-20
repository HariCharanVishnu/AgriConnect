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
echo 🌾 Starting AI service...
start "AI Service" cmd /k "cd ai-services\crop_prediction && python app.py"

echo.
echo ✅ All services are starting...
echo 🌐 Open http://localhost:5173 in your browser
echo 🌾 AI Service: http://localhost:5001
echo.
pause 