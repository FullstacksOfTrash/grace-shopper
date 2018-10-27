const express = require('express');
const router = express.Router();
const { Order, LineItem } = require('../db');

router.get('/', async (req, res, next)=> { // get all orders - only for admin
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

module.exports = router;

