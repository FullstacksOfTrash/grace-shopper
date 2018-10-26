// used as a hub from which to bundle and export routes
// e.g., app.js might have middleware such as app.use('/api', api)
// and this file would bring all the separate route files together
// this is an example from my senior enrichment:const express = require('express')

// const router = express.Router()
// const schoolRoutes = require('./schoolRoutes')
// const studentRoutes = require('./studentRoutes')

// router.use('/api/schools', schoolRoutes)
// router.use('/api/students', studentRoutes)

// module.exports = router;


const express = require('express');
const router = express.Router();

//finds all products
router.get('/products', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

//finds product based on id
router.get('/products/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.send(product))
    .catch(next);
});

//checks user and checks for admin status before allowing user to update item info
router.put('/products/:id', (req, res, next) => {
  if (!req.user || !req.user.admin) {
    return next({ status: 401 });
  }
  Product.findById(req.params.id)
    .then(product => product.update('quantity, etc...'))
    .then(updated => res.send(updated))
    .catch(next);
});

//checks user and checks for admin status before allowing user to create item
router.post('/products', (req, res, next) => {
  if (!req.user || !req.user.admin) {
    return next({ status: 401 });
  }
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(next);
});

module.exports = router;