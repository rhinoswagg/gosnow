@echo off
title GoSnow — Push to Cloudflare
color 1F
cd /d "%~dp0"

echo.
echo  ============================================
echo   GoSnow — Push Changes to Cloudflare
echo  ============================================
echo.

set /p MSG=Enter a short description of your changes (or press Enter to skip):

if "%MSG%"=="" (
  set MSG=Update GoSnow website
)

echo.
echo  Adding changes...
git add .

echo  Committing: %MSG%
git commit -m "%MSG%"

echo  Pushing to GitHub...
git push

echo.
if %ERRORLEVEL%==0 (
  echo  ============================================
  echo   SUCCESS! Your changes are live on Cloudflare
  echo   in about 30 seconds.
  echo  ============================================
) else (
  echo  ============================================
  echo   Something went wrong. Check the output above.
  echo  ============================================
)

echo.
pause
