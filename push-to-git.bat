@echo off
echo ========================================
echo Git Push Script for Week 2-6 Alignment Fixes
echo ========================================
echo.

cd /d "c:\Users\Superman\Downloads\Cambridge-VoH-ABC-LP-main\VANILLA_HANDOVER"

echo Current directory: %CD%
echo.

echo [1/5] Checking git status...
git status
echo.

echo [2/5] Staging all changes...
git add .
echo.

echo [3/5] Committing changes...
git commit -m "Fix Week 2-6 alignment CSS and Week 3 home page link" -m "- Added comprehensive Week 2-6 alignment CSS (919 lines)" -m "- Fixed Week 2 HTML bug (missing px unit)" -m "- Fixed Week 3 link on home page" -m "- Updated Week 3 CSS positioning" -m "- Added responsive breakpoints for all weeks"
echo.

echo [4/5] Checking remote repository...
git remote -v
echo.

echo [5/5] Pushing to GitHub...
git push origin main
echo.

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Push failed! Trying with 'master' branch instead...
    git push origin master
)

echo.
echo ========================================
echo Done! Check output above for any errors.
echo ========================================
pause
