@echo off
:: Batch script untuk mengembalikan file hosts ke semula
net session >nul 2>&1
if %errorLevel% neq 0 (
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

echo ========================================================
echo   Mengembalikan File Hosts Windows ke Normal
echo ========================================================
echo.

powershell -Command "(Get-Content C:\Windows\System32\drivers\etc\hosts) | Where-Object { $_ -notmatch 'smart-tka.my.id' } | Set-Content C:\Windows\System32\drivers\etc\hosts"
ipconfig /flushdns >nul

echo [BERHASIL!] DNS Local berhasil dikembalikan ke semula!
echo.
pause
