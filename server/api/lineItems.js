const router = require('express').Router()
module.exports = router
const LineItem = require('../db/models/LineItem')

// mounted on /api/lineItems

router.post('/', (req, res, next) => {
  //route will be sent a productId in req.body to determine waht product a lineItem is related to
	LineItem.create({ productId: req.body.productId})
		.then(lineItem => res.status(201).send(lineItem))
		.catch(next)
})

router.put('/:id', (req, res, next) => {
  //used to incrementing or decrementing lineItem
	LineItem.findById(req.params.id)
		.then(lineItem => lineItem.update(req.body))
		.then(lineItem => res.send(lineItem))
		.catch(next)
})
