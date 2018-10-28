const router = require('express').Router()
const { Product, Review } = require('../db')

// route: /api/products

router.post('/:id/reviews', (req, res, next) => {     //will be passed userId into req.body to delete author of post || req.body can be empty for anonymous authors or non verfied buyers
  const { userId, rating, text, verfiedBuyer } = req.body
  Review.create({ id: req.params.id, rating, text, verfiedBuyer})
  .then(review => res.send(review))
  .catch(next)
})

//finds product based on id and includes review
router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id, {
    include: [{ model : Review}]
  })
    .then(product => res.send(product))
    .catch(next);
});

//used to update stock when user buys item
router.put('/:id', (req, res, next) => {
  const { quantity } = req.body
  Product.findById(req.params.id)
    .then(product => product.update({ stock: product.stock - quantity }))
    .then(updated => res.send(updated))
    .catch(next);
});

//finds all products
router.get('/', (req, res, next) => {
  Product.findAll({
    include: [{ model: Review}]
  })
    .then(products => res.send(products))
    .catch(next);
});

//checks for user's admin status before allowing them to create product
// router.post('/', (req, res, next) => {
//     if (!req.user || !req.user.admin) {
//       return next({ status: 401 });
//     }
//     Product.create(req.body)
//       .then(product => res.send(product))
//       .catch(next);
//   });

module.exports = router;