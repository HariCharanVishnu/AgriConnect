@echo off
echo Creating Demo Users...
curl -X POST http://localhost:5000/api/auth/create-demo-users
echo.
echo Demo users created! You can now login with:
echo Farmer: farmer@example.com / password123
echo Agent: agent@example.com / password123
echo Admin: admin@example.com / password123
pause 