const router = require('express').Router()
const { Review } = require('../db')

const loggedIn = (req, res, next)=> {
  next( req.user ? null: { status: 401 })
}

const isMe = (paramKey)=> {
  return (req, res, next)=> {
      next( req.user.id == req.params[paramKey] ? null : { status: 401 })
  }
}

const isAdmin = (paramKey) => {
  return (req, res, next) => {
    next( req.user.id == req.params[paramKey] && req.user.admin ? null : { status: 401 })
  }
}

// mounted on /api/reviews
router.get('/:productId', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.productId
    }
  })
  .then(reviews => res.send(reviews))
  .catch(next)
})

router.post('/:userId/:productId', loggedIn, isMe('userId') || isAdmin('userId'), (req, res, next) => {     
  const { userId, rating, text, verfiedBuyer } = req.body
  Review.create({ productId: req.params.productId, rating, text, verfiedBuyer, userId})
  .then(review => res.send(review))
  .catch(next)
})
//will be passed userId into req.body to delete author of post || req.body can be empty for anonymous authors or non verfied buyers

router.delete('/:userId/:productId/:reviewId', loggedIn, isMe('userId') || isAdmin('userId'), (req, res, next) => {
  Review.findById(parseInt(req.params.reviewId))
    .then(response => response.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
});

router.put('/:userId/:reviewId', loggedIn, isMe('userId') || isAdmin('userId'), (req, res, next) => {
  Review.findById(req.params.reviewId)
    .then(review => review.update(req.body))
    .then(review => res.send(review))
    .catch(next)
})

module.exports = router;