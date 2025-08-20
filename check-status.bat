@echo off
echo 🔍 SAP Project Status Check
echo ================================
echo.

echo 📁 Checking project structure...
if exist "server\.env" (
    echo ✅ .env file exists
) else (
    echo ❌ .env file missing
)

if exist "server\uploads" (
    echo ✅ Uploads directory exists
) else (
    echo ❌ Uploads directory missing
)

if exist "ai-services\crop_prediction\requirements.txt" (
    echo ✅ AI service requirements exist
) else (
    echo ❌ AI service requirements missing
)

echo.
echo 📦 Checking dependencies...
cd server
if exist "node_modules" (
    echo ✅ Backend dependencies installed
) else (
    echo ❌ Backend dependencies missing - run npm install
)
cd ..

cd frontend
if exist "node_modules" (
    echo ✅ Frontend dependencies installed
) else (
    echo ❌ Frontend dependencies missing - run npm install
)
cd ..

echo.
echo 🗄️ Checking MongoDB connection...
cd server
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/sap-project').then(() => { console.log('✅ MongoDB connection successful'); process.exit(0); }).catch(err => { console.log('❌ MongoDB connection failed:', err.message); process.exit(1); });"
cd ..

echo.
echo 🌐 Checking service ports...
echo 📱 Backend (port 5000): 
netstat -an | findstr :5000 >nul && echo ✅ Port 5000 is available || echo ❌ Port 5000 is in use

echo 🌐 Frontend (port 5173):
netstat -an | findstr :5173 >nul && echo ✅ Port 5173 is available || echo ❌ Port 5173 is in use

echo 🌾 AI Service (port 5001):
netstat -an | findstr :5001 >nul && echo ✅ Port 5001 is available || echo ❌ Port 5001 is in use

echo.
echo 📋 Environment Configuration:
cd server
if exist ".env" (
    echo ✅ .env file found
    echo 📄 Contents:
    type .env
) else (
    echo ❌ .env file not found
)
cd ..

echo.
echo 🚀 Ready to start? Use:
echo    start-project.bat - Start all services
echo    start-backend.bat - Start backend only
echo    start-frontend.bat - Start frontend only
echo    start-ai-service.bat - Start AI service only
echo.
pause
