@echo off
echo ========================================================
echo   Menjalankan Server Lokal TKA Smart Exam (Port 3000)
echo ========================================================
echo Buka browser di: http://localhost:3000 atau http://127.0.0.1:3000
echo Tekan Ctrl + C untuk menghentikan server.
echo.

where node >nul 2>nul
if %ERRORLEVEL% equ 0 (
    node server.js
) else if exist "C:\xampp\php\php.exe" (
    "C:\xampp\php\php.exe" -S 0.0.0.0:3000 router.php
) else (
    php -S 0.0.0.0:3000 router.php
)
pause
