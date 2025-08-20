@echo off
echo 🌾 Starting SAP AI Service...
echo.

echo 📦 Checking Python installation...
py --version
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    echo 💡 Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)

echo.
echo 📁 Navigating to AI service directory...
cd ai-services\crop_prediction

echo.
echo 📦 Installing Python dependencies...
pip install -r requirements.txt

echo.
echo 🚀 Starting AI Service on port 5001...
echo 📊 Service will be available at: http://localhost:5001
echo 📋 Available endpoints:
echo    - POST /predict - Get crop predictions
echo    - GET /crops - List available crops
echo    - GET /health - Service health check
echo.
echo 🌐 Backend will connect to this service automatically
echo.

py app.py

pause
