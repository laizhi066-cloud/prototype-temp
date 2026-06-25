@echo off
cd /d "%~dp0.."
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo Please ask AI to help with environment-bootstrap.
  echo You can also run: powershell -ExecutionPolicy Bypass -File scripts/setup.ps1 -InstallNode
  pause
  exit /b 1
)
node scripts/check-for-pm.mjs
pause
