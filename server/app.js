const express = require('express');
const app = express();
const path = require('path')
const api = require('./api')


app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, '../dist')))

app.use(express.static(path.join(__dirname, '..','public')))

app.use('/api', api)

app.get('/', (req, res, next) => {
  res.sendFile(index.html)
})

module.exports = app;