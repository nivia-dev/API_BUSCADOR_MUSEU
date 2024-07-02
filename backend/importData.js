const fs = require('fs');
const path = require('path');
const db = require('./database');

// Caminho para o arquivo JSON
const jsonFilePath = path.resolve(__dirname, './data.json');

// Ler o arquivo JSON
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo JSON:', err);
    return;
  }

  const registros = JSON.parse(data);

  // Inserir registros no banco de dados
  registros.forEach((item) => {
    const {
        "Nome do Museu": nome_do_museu,
        "Descrição": descricao,
        "Logradouro": logradouro,
        "Município": municipio ,
        "UF": uf,
        "Ano de abertura": ano_de_abertura,
        "Temática do Museu": tematica_do_museu,
        "Tipo do Museu": tipo_do_museu } = item;

    

    db.run(
      `INSERT INTO museus ("Nome do Museu", "Descrição", "Logradouro", "Município", "UF", "Ano de abertura", "Temática do Museu", "Tipo do Museu") VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome_do_museu, descricao, logradouro, municipio, uf, ano_de_abertura, tematica_do_museu, tipo_do_museu],
      (err) => {
        if (err) {
          console.error('Erro ao inserir dados:', err.message);
        }
      }
    );
  });

  console.log('Importação concluída!');
});
