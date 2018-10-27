const express = require('express');
const router = express.Router();
const { Order, LineItem } = require('../db');

router.get('/', async (req, res, next)=> { //get all orders
  try {
    const cart = await Order.findOne({ where: { status: 'CART' }});
    if (!cart) { await Order.create({ status: 'CART' })};
    const orders = await Order.findAll({ include: [LineItem] });
    res.send(orders);
  }
  catch(ex) {
    next(ex);
  }
});

router.put('/:orderId', (req, res, next)=> { //edit an order
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(order => res.send(order))
    .catch(next);
});

router.put('/:orderId/lineItems/:lineItemId', (req, res, next)=> { //edit a lineItem
  LineItem.findById(req.params.lineItemId)
    .then(lineItem => lineItem.update(req.body))
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

router.delete('/:orderId/lineItems/:lineItemId', (req, res, next)=> { //delete a lineItem
  LineItem.destroy({ where: {
    id: req.params.lineItemId,
    orderId: req.params.orderId
  }})
    .then(()=> res.sendStatus(204))
    .catch(next);
});

router.post('/:orderId/lineItems', (req, res, next)=> { //create a lineItem
  LineItem.create({
    ...req.body,
    orderId: req.params.orderId
  })
  .then(lineItem => res.status(201).send(lineItem))
  .catch(next);
});


module.exports = router;

