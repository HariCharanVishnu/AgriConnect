Write-Host "🌾 Starting SAP AI Service..." -ForegroundColor Green
Write-Host ""

Write-Host "📦 Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = py --version 2>&1
    Write-Host "✅ $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "💡 Please install Python 3.8+ from https://python.org" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "📁 Navigating to AI service directory..." -ForegroundColor Yellow
Set-Location "ai-services\crop_prediction"

Write-Host ""
Write-Host "📦 Installing Python dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt

Write-Host ""
Write-Host "🚀 Starting AI Service on port 5001..." -ForegroundColor Green
Write-Host "📊 Service will be available at: http://localhost:5001" -ForegroundColor Cyan
Write-Host "📋 Available endpoints:" -ForegroundColor Cyan
Write-Host "   - POST /predict - Get crop predictions" -ForegroundColor White
Write-Host "   - GET /crops - List available crops" -ForegroundColor White
Write-Host "   - GET /health - Service health check" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Backend will connect to this service automatically" -ForegroundColor Cyan
Write-Host ""

py app.py
