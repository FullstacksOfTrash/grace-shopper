const router = require('express').Router()
const { User, Order, LineItem } = require('../db')

// route : /api/users

router.put('/:userId/orders/:orderId/lineitem/:id', (req, res, next) => {       //used to incrementing or decrementing lineItem
    LineItem.findById(req.params.lineItemId)
    .then(lineItem => lineItem.update(req.body))
    .then(lineItem => res.send(lineItem))
    .catch(next)
})

router.destroy('/:userId/orders/:orderId/lineitem/:id', (req, res, next) => {   //when lineItem has been reduced to zero, a delete request will be called to destroy it 
    LineItem.findOne({
        where: {
            id: req.params.id,
            orderId: req.params.orderId
        }   
    })
    .then(lineItem => lineItem.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.post('/:userId/orders/:orderId/lineitem', (req, res, next) => {         //route will be sent a productId in req.body to determine waht product a lineItem is related to
    LineItem.create({ productId: req.body.productId, orderId: req.params.orderId})
    .then(lineItem => res.send(lineItem))
    .catch(next)
})

router.get('/:userId/orders', async(req, res, next) => {
    const temp = {
        userId : req.body.userId,
        status: 'CART'
    }
    try {
        const cart =  await Order.findOne(temp)
        if(!cart) await Order.create(temp)
        const orders = await Order.findAll({
            where: {
                userId: req.body.id
            },
            include: [ { model:lineItem } ]
        })
        res.send(orders)
    } catch(err){
        next(err)
    }
})

router.get('/:userId/reviews', (req, res, next) => {
    Reviews.findAll({
        where: {
            userId: req.params.userId
        }
    })
    .then(Reviews)
})

module.exports = router