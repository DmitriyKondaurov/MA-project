const express = require('express');
const app = express();
const user = { email: 'invisibl@ukr.net', pass: '3Fgv$DRj'};
const transactions = require('./transactions');
const categories = require('./category');

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

app.listen(8080, () => console.log('Started server at http://localhost:8080!'));
