const express = require('express');
const app = express();
const path = require('path')
const api = require('./api')


module.exports = app;

app.use(express.json())
app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.use(express.static(path.join(__dirname, '..','public')))

app.use('/api', api)

app.get('/', (req, res, next) => {
  res.sendFile(index.html)
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).send({error : err.message})
})
