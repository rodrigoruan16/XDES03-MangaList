#!/bin/bash

# Pergunta ao usuário se deseja continuar
read -p "LEIA ATENTAMENTE: Deseja realmente iniciar o servidor e *MATAR PROCESSOS* nas portas 3000 e 3001? (Y/N): " confirm

# Verifica se a resposta é Y ou y
if [[ "$confirm" != "Y" && "$confirm" != "y" ]]; then
  echo "Operação cancelada."
  exit 1
fi

echo "Killing processes on ports 3000 and 3001..."

# Kill port 3000
powershell.exe -Command "Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force" 2>/dev/null

# Kill port 3001
powershell.exe -Command "Stop-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess -Force" 2>/dev/null

echo "Starting backend..."
(cd server && npm install && npm start) &

echo "Starting frontend..."
(cd client && npm install && npm start) &

wait
