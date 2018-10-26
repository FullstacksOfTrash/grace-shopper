const express = require('express');
const router = express.Router();
const { User } = require('../db');
const jwt = require('jwt-simple');

router.use((req, res, next)=> {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  let id;
  try {
    id = jwt.decode(token, process.env.JWT_SECRET).id;
    User.findById(id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(next);
  }
  catch(ex) {
    return next({ status: 401 })
  }
});

router.post('/', (req, res, next)=> {
  const { email, password } = req.body;
  User.findOne({ where: { email, password }})
    .then(user => {
      if (!user) {
        return next({ status: 401 })
      }
      const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET)
      res.send({ token });
    })
});

router.get('/', (req, res, next)=> {
  if (!req.user) {
    return next({ status: 401 })
  }
  res.send(req.user);
});

module.exports = router;