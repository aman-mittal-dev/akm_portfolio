@echo off
title Portfolio Frontend Server
echo ========================================
echo   Starting Frontend Server...
echo ========================================
echo.
cd frontend

if not exist node_modules (
    echo ERROR: Dependencies not installed!
    echo Please run START.bat first or run: npm install
    pause
    exit /b 1
)

echo Starting frontend on http://localhost:3000
echo Browser will open automatically
echo Press Ctrl+C to stop the server
echo.
npm start



