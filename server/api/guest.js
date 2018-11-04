const router = require('express').Router()
const { Order, LineItem } = require('../db')

router.post('/lineItems', async (req, res, next) => {
  try {
    const { lineItems } = req.body
    const order = await Order.create({ status : 'ORDER' })
    const created = await Promise.all(lineItems.map(item => {
      return LineItem.create(item)
    }))
    await Promise.all(created.map(item => item.update({orderId: order.id})))
    res.send(order)
  } catch(err){
    next(err)
  }
})

module.exports = router