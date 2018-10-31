const express = require('express');
const jwt = require('jwt-simple')
const bodyParser = require('body-parser')
const app = express();
const path = require('path')
const api = require('./api')
const { User } = require('../server/db/')

app.use(express.json())
app.use(bodyParser.text())
app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.use(express.static(path.join(__dirname, '..','public')))

app.use((req, res, next)=> {     //checks for token
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  let id;
  try {
    id = jwt.decode(token, process.env.JWT_SECRET).id
    User.findById(id)
    .then(user => {
      req.user = user
      next()
    })
    .catch(next)
  } catch(err){
    return next({ status: 401 })
  }
});



app.use('/api', api)

app.get('/', (req, res, next) => {
  res.sendFile(index.html)
})








app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).send({error : err.message})
})

module.exports = app;
