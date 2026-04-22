@echo off
echo =========================================
echo Starting Abhinavan Portfolio Setup...
echo =========================================

echo.
echo [1/2] Installing required dependencies...
call npm install --legacy-peer-deps
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ ERROR: Failed to install dependencies.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/2] Starting the development server...
echo (If this is successful, you'll see a link like http://localhost:3000)
call npm run dev
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ ERROR: Failed to start the server. Check the logs above.
    pause
    exit /b %ERRORLEVEL%
)

pause
