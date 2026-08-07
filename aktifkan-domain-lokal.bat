@echo off
:: Batch script untuk mengaktifkan smart-tka.my.id secara otomatis di Windows
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [INFO] Meminta hak akses Administrator...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

echo ========================================================
echo   Mengaktifkan Domain smart-tka.my.id ke Server Lokal
echo ========================================================
echo.

:: Tambahkan ke file hosts jika belum ada
findstr /C:"smart-tka.my.id" "C:\Windows\System32\drivers\etc\hosts" >nul
if %errorLevel% neq 0 (
    echo [1/3] Menambahkan smart-tka.my.id ke file hosts Windows...
    echo 127.0.0.1       smart-tka.my.id >> "C:\Windows\System32\drivers\etc\hosts"
    echo [OK] File hosts berhasil diperbarui!
) else (
    echo [1/3] Domain smart-tka.my.id sudah terdaftar di file hosts.
)

echo.
:: Flush DNS
echo [2/3] Membersihkan DNS Cache Windows...
ipconfig /flushdns >nul

echo.
:: Restart Apache XAMPP
echo [3/3] Menjalankan Apache XAMPP...
taskkill /F /IM httpd.exe >nul 2>&1
timeout /t 1 >nul
cd /d C:\xampp\apache
start /b bin\httpd.exe

echo.
echo ========================================================
echo   [BERHASIL!] Domain http://smart-tka.my.id/ Siap Dijalankan!
echo ========================================================
echo.
pause
