@echo off
echo ========================================
echo    SAP Project - Server Startup
echo ========================================
echo.

echo Checking for .env file...
if not exist ".env" (
    echo Creating .env file from template...
    copy env-template.txt .env
    echo .env file created successfully!
) else (
    echo .env file already exists.
)
echo.

echo Installing dependencies...
call npm install
echo.

echo Starting the server...
echo.
echo Server will be available at: http://localhost:5000
echo Demo users page: http://localhost:5000/create-demo-users
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start 