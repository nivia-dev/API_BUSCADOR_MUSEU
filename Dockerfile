# Use a versão oficial do Node.js como base
FROM node:14

# Defina o diretório de trabalho para o backend
WORKDIR /usr/src/app/backend

# Copie os arquivos package.json e package-lock.json do backend
COPY package*.json ./

# Instale as dependências do backend e force a recompilação do sqlite3
RUN npm install --build-from-source sqlite3

# Defina o diretório de trabalho para o frontend
WORKDIR /usr/src/app/frontend

# Copie os arquivos package.json e package-lock.json do frontend
COPY ../frontend/package*.json ./

# Instale as dependências do frontend
RUN npm install

# Construa o frontend
RUN npm run build

# Copie os arquivos construídos do frontend para o diretório do backend
WORKDIR /usr/src/app/backend
COPY ../frontend/dist ./frontend/dist

# Exponha a porta da aplicação
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
