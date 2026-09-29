# src/backend/Dockerfile
FROM node:24-alpine

# Impostiamo la cartella di lavoro interna al container
WORKDIR /app

# Copiamo i file di configurazione dei pacchetti dalla radice del monorepo
COPY package*.json ./
COPY src/backend/package*.json ./src/backend/

# Installiamo le dipendenze
RUN npm install

# Copiamo tutto il codice sorgente necessario (Backend, Frontend e Logs)
COPY src/backend/ ./src/backend/
COPY src/frontend/ ./src/frontend/
COPY logs/ ./logs/

# Comunichiamo a Docker che il server risponde sulla porta 3000
EXPOSE 3000

# Comando per avviare il server in produzione
CMD ["node", "src/backend/src/server.js"]
