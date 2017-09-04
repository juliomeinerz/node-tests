const express = require('express');
const app = express();
const pool = require('./database.js');
const mysql = require('mysql');

app.get('/', (req, res) => {
  res.send({error: 'Nada para ver aqui...'});
})

app.get('/produtos', (req, res) => {
  pool.getConnection((error, connection) => {
    let prodId = req.query.id;    

    let query = 'SELECT * FROM produto';
    if(prodId.length)
      query += " WHERE codProduto = " + prodId;

    connection.query(query, (error, rows) => {
      if(error)
        res.send("Erro ao consultar os produtos: " + error);

      res.json(rows);  

      connection.release();
    })
  })  
})

app.post('/produtos', (req, res) => {
  pool.getConnection((error, connection) => {
    if(error)
      res.json({error: 'Falha na comunicação com o banco de dados.'});

    let produto = {
      nivel: req.query.nivel,
      codProduto: req.query.codProduto,
      nomeProduto: req.query.nomeProduto,
      descProduto: req.query.descProduto,
      precoUnit: req.query.precoUnit,
      codDeposito: req.query.codDeposito  
    }

    let query = "INSERT INTO syscom.produto SET ?";
    connection.query(query, produto, (error, result) => {
      if(error)
        res.json({error: error});

      res.send("Produto cadastrado com sucesso!");

      connection.release();
    })
  })
})

app.listen(8090);