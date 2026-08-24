@echo off
echo ===================================================
echo           Starting ElevateHR Application
echo ===================================================
echo Starting Backend API Server on port 5000...
start cmd /k "cd server && node server.js"
echo Starting Frontend Client on port 3000...
start cmd /k "cd client && npm run dev"
echo.
echo Application is launching! Open http://localhost:3000 in your browser.
echo ===================================================
