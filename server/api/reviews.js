const router = require('express').Router()
const { Review, Product } = require('../db')

// mounted on /api/reviews

router.post('/:productId', (req, res, next) => {     //will be passed userId into req.body to delete author of post || req.body can be empty for anonymous authors or non verfied buyers
  const { userId, rating, text, verfiedBuyer } = req.body
  Review.create({ productId: req.params.productId, rating, text, verfiedBuyer, userId})
  .then(review => res.send(review))
  .catch(next)
})

router.delete('/:productId/:reviewId', (req, res, next) => {
  Review.findById(parseInt(req.params.reviewId))
    .then(response => response.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
});

router.get('/:productId', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.productId
    }
  })
  .then(reviews => res.send(reviews))
  .catch(next)
})

router.put('/:reviewId', (req, res, next) => {
  Review.findById(req.params.reviewId)
    .then(review => review.update(req.body))
    .then(review => res.send(review))
    .catch(next)
})

module.exports = router;