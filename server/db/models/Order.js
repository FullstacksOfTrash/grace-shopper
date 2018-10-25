const conn = require('../conn');

const Order = conn.define('order', {
  status: {
    type: conn.Sequelize.ENUM('CART', 'ORDER'),
  },
});

module.exports = Order;
