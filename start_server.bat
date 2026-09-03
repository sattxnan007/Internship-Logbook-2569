@echo off
echo =======================================================
echo  Starting Notion-style Internship Work Log Web App...
echo =======================================================
echo.
echo Opening web browser at http://localhost:8080 ...
start http://localhost:8080
echo.
echo Starting local web server... (Press Ctrl+C to stop)
python -m http.server 8080 --bind 127.0.0.1
pause
