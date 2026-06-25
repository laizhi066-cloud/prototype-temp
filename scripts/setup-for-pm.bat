@echo off
cd /d "%~dp0.."
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo Please ask AI to help with environment-bootstrap.
  pause
  exit /b 1
)
node scripts/setup-for-pm.mjs
pause
