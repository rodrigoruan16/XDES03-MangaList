#!/bin/bash

echo "Killing processes on ports 3000 and 3001..."

# Kill port 3000
powershell.exe -Command "Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force" 2>/dev/null

# Kill port 3001
powershell.exe -Command "Stop-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess -Force" 2>/dev/null

echo "Starting backend..."
(cd server && npm start) &

echo "Starting frontend..."
(cd client && npm start) &

wait
