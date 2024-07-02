const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();

app.use(cors());



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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
