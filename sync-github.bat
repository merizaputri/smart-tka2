@echo off
title Sync Project ke GitHub (merizaputri/smart-tka2)
color 0A

:: Tambahkan path Git jika belum ada di PATH
set "PATH=%PATH%;C:\Users\meriza.putri\AppData\Local\Programs\Git\cmd;C:\Program Files\Git\cmd"

echo ========================================================
echo   Auto Sync Projek TKA Smart Exam ke GitHub
echo   Repository: https://github.com/merizaputri/smart-tka2.git
echo ========================================================
echo.

:: Memeriksa apakah Git terpasang
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git belum terdeteksi!
    echo Silakan restart CMD / File Explorer Anda.
    echo.
    pause
    exit /b
)

:: 1. Inisialisasi Git jika belum ada
if not exist ".git" (
    echo [1/4] Menginisialisasi Git Repository...
    git init
    git branch -M main
    git remote add origin https://github.com/merizaputri/smart-tka2.git
    echo [OK] Git berhasil diinisialisasi!
) else (
    echo [1/4] Memeriksa Remote Repository...
    git remote set-url origin https://github.com/merizaputri/smart-tka2.git
)

echo.
:: 2. Input pesan commit (Opsional)
set /p msg="[2/4] Masukkan pesan commit (atau tekan Enter): "
if "%msg%"=="" set msg=Update TKA Smart Exam

echo.
:: 3. Add dan Commit
echo [3/4] Menambahkan file dan melakukan Commit...
git add .
git commit -m "%msg%"

echo.
:: 4. Push ke GitHub
echo [4/4] Mengirim (Push) perubahan ke GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   [BERHASIL!] Projek berhasil di-sync ke GitHub!
    echo   Link: https://github.com/merizaputri/smart-tka2
    echo ========================================================
) else (
    echo.
    echo [Gagal] Terjadi kesalahan saat push ke GitHub.
    echo Pastikan Anda sudah login ke akun GitHub Anda.
)

echo.
pause
