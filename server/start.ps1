Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    SAP Project - Server Startup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Checking for .env file..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file from template..." -ForegroundColor Green
    Copy-Item "env-template.txt" ".env"
    Write-Host ".env file created successfully!" -ForegroundColor Green
} else {
    Write-Host ".env file already exists." -ForegroundColor Green
}
Write-Host ""

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host ""

Write-Host "Starting the server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Server will be available at: http://localhost:5000" -ForegroundColor Green
Write-Host "Demo users page: http://localhost:5000/create-demo-users" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host ""

npm start 