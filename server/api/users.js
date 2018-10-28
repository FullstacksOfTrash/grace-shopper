const router = require('express').Router()

const { User, Order, LineItem, Review } = require('../db')


const loggedIn = (req, res, next)=> {
    next( req.user ? null: { status: 401 })
}

const isMe = (paramKey)=> {
    return (req, res, next)=> {
        next( req.user.id === req.params[paramKey]*1 ? null : { status: 401 })
    }
}


router.get('/:userId/orders', loggedIn, isMe('userId'), async(req, res, next) => {

    const temp = {
        userId : req.user.id,
        status: 'CART'
    }
    try {
        const cart =  await Order.findOne({
            where: temp
        })
        if(!cart) await Order.create(temp)
        const orders = await Order.findAll({
            where: {
                userId: req.params.userId
            },
            include: [ LineItem ]
        })
        res.send(orders)
    } catch(err){
        next(err)
    }
})

router.put('/:userId/orders/:orderId', loggedIn, isMe, (req, res, next)=> { //edit a user's order, for example, change status from 'CART' to 'ORDER'
    Order.findById(req.params.id)
        .then(order => order.update(req.body))
        .then(order => res.send(order))
        .catch(next)
})

router.put('/:userId/orders/:orderId/lineitems/:id', loggedIn, isMe, (req, res, next) => {       //used to incrementing or decrementing lineItem
    LineItem.findById(req.params.lineItemId)
        .then(lineItem => lineItem.update(req.body))
        .then(lineItem => res.send(lineItem))
        .catch(next)
})

router.delete('/:userId/orders/:orderId/lineitems/:id', loggedIn, isMe, (req, res, next) => {   //when lineItem has been reduced to zero, a delete request will be called to destroy it
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

router.post('/:userId/orders/:orderId/lineitems', loggedIn, isMe, (req, res, next) => {         //route will be sent a productId in req.body to determine waht product a lineItem is related to
    LineItem.create({ productId: req.body.productId, orderId: req.params.orderId})
    .then(lineItem => res.status(201).send(lineItem))
    .catch(next)
})

// User's reviews
router.get('/:userId/reviews', (req, res, next) => {
    Review.findAll({
        where: {
            userId: req.params.userId
        }
    })
    .then(reviews => res.send(reviews))
    .catch(next)
})

module.exports = router


