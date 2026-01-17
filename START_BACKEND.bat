@echo off
title Portfolio Backend Server
echo ========================================
echo   Starting Backend Server...
echo ========================================
echo.
cd backend

if not exist node_modules (
    echo ERROR: Dependencies not installed!
    echo Please run START.bat first or run: npm install
    pause
    exit /b 1
)

echo Starting server on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.
npm start



