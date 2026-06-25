@echo off
cd /d "%~dp0.."
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo Please run scripts\check-for-pm.bat first.
  pause
  exit /b 1
)
node scripts/start-for-pm.mjs
pause
