const express = require('express');
const cors = require('cors');
const path = require('path');
//const db = require('./database');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(cors());
app.use(express.json());

// Usar DATABASE_URL para o caminho do banco de dados
const dbPath = path.resolve(__dirname, process.env.DATABASE_URL || './database.db');
const db = new sqlite3.Database(dbPath);
const NODE_ENV = process.env.NODE_ENV || 'development';

app.get('/api/museus', (req, res) => {
 
  const { pagina = 1, limite = 20, uf, municipio, buscaTermo } = req.query;
  const offset = (pagina - 1) * limite;

  let query = `SELECT * FROM museus`;
  let params = [];

  if (uf) {
    query += ` WHERE UF = ?`;
    params.push(uf);
  }

  if (municipio) {
    query += params.length ? ` AND` : ` WHERE`;
    query += ` Município = ?`;
    params.push(municipio);
  }

  if (buscaTermo) {
    query += params.length ? ` AND` : ` WHERE`;
    query += ` "Nome do Museu" LIKE ?`;
    params.push(`%${buscaTermo}%`);
  }

  query += ` LIMIT ? OFFSET ?`;
  params.push(limite, offset);

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/ufs', (req, res) => {
  db.all(`SELECT DISTINCT UF FROM museus ORDER BY CASE WHEN UF IS NULL THEN 1 ELSE 0 END, UF`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows.map(row => row.UF));
    }
  });
});

app.get('/api/municipios', (req, res) => {
  const { uf } = req.query;

  db.all(`SELECT DISTINCT Município FROM museus WHERE UF = ? ORDER BY CASE WHEN Município IS NULL THEN 1 ELSE 0 END, Município`, [uf], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows.map(row => row.Município));
    }
  });
});

app.get('/api/pesquisa', (req, res) => {
  const { termo } = req.query;
  const likeTerm = `%${termo}%`;
  const query = `SELECT * FROM museus WHERE "Nome do Museu" LIKE ?`;

  db.all(query, [likeTerm], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Servir os arquivos do frontend em produçao
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,  'frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,  'frontend/dist/index.html'))
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
