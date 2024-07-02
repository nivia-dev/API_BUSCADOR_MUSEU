const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o banco de dados
const dbPath = path.resolve(__dirname, 'database.db');

// Conectar ao banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');

      // Criar tabela se não existir
    db.run(`CREATE TABLE IF NOT EXISTS museus (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      "Nome do Museu" TEXT,
      "Descrição" TEXT,
      "Logradouro" TEXT,
      "Município" TEXT,
      "UF" TEXT,
      "Ano de abertura" INTEGER,
      "Temática do Museu" TEXT,
      "Tipo do Museu" TEXT
    )`);
    }
    
   
});

module.exports = db;
