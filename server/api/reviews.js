const router = require('express').Router()
const { Review } = require('../db')

// mounted on /api/products

router.post('/:id/reviews', (req, res, next) => {     //will be passed userId into req.body to delete author of post || req.body can be empty for anonymous authors or non verfied buyers
  const { userId, rating, text, verfiedBuyer } = req.body
  Review.create({ productId: req.params.id, rating, text, verfiedBuyer, userId})
  .then(review => res.send(review))
  .catch(next)
})

module.exports = router;