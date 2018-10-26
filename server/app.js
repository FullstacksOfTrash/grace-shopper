const express = require('express');
const app = express();
const path = require('path')


module.exports = app;

app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.use(express.static(path.join(__dirname, '..','public')))

app.get('/', (req, res, next) => {
  res.sendFile(index.html)
})

