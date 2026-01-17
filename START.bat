@echo off
echo ========================================
echo   Portfolio Website - Quick Start
echo ========================================
echo.

echo Step 1: Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Then run this script again.
    echo.
    pause
    exit /b 1
)

echo Node.js found! ✓
echo.

echo Step 2: Installing Backend Dependencies...
cd backend
if not exist node_modules (
    echo Installing backend packages (this may take 2-3 minutes)...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Backend installation failed!
        pause
        exit /b 1
    )
) else (
    echo Backend dependencies already installed! ✓
)

echo.
echo Step 3: Creating .env file...
if not exist .env (
    if exist env.example.txt (
        copy env.example.txt .env >nul
        echo .env file created! ✓
    ) else (
        echo WARNING: env.example.txt not found!
    )
) else (
    echo .env file already exists! ✓
)

echo.
echo Step 4: Installing Frontend Dependencies...
cd ..\frontend
if not exist node_modules (
    echo Installing frontend packages (this may take 3-5 minutes)...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Frontend installation failed!
        pause
        exit /b 1
    )
) else (
    echo Frontend dependencies already installed! ✓
)

cd ..

echo.
echo ========================================
echo   Setup Complete! ✓
echo ========================================
echo.
echo Now you need to run the website in TWO terminals:
echo.
echo TERMINAL 1 (Backend):
echo   1. cd backend
echo   2. npm start
echo.
echo TERMINAL 2 (Frontend):
echo   1. cd frontend
echo   2. npm start
echo.
echo Then open browser: http://localhost:3000
echo.
echo ========================================
pause



