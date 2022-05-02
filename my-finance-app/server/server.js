const express = require('express');
const app = express();
const user = { email: 'invisibl@ukr.net', pass: '3Fgv$DRj'};
const transactions = require('./transactions');
const categories = require('./category');
const balance = require('./balance');
const test = require('../test.json');
const fs = require('fs')

app.use( function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/transactions', (req, res) => {
  res.send(transactions);
});

app.get('/api/categories', (req, res) => {
  res.send(categories);
});

app.get('/api/test', (req, res) => {
  fs.readFile("test.json", (err, data) => {
    if (err) {
       throw error;
    }
    res.send(data)
  });
});

app.post('/api/test', (req, res) => {
  data = JSON.stringify(req.body.storage);
  fs.writeFile("test.json", data, 'utf8', (err) => {
    if (err) {
       throw error;
    }
    res.status(200).send("File write success");
  })
})

app.get('/api/balance', (req, res) => {
  res.send(balance);
});

app.listen(8080, () => console.log('Started server at http://localhost:8080!'))
