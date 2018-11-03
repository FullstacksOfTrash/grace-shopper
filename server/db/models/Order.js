const conn = require('../conn');

const Order = conn.define('order', {
  // id: {
  //   type: conn.Sequelize.UUID,
  //   defaultValue: conn.Sequelize.UUIDV4,
  //   primaryKey: true
  // },
  status: {
    type: conn.Sequelize.ENUM('CART', 'ORDER'),
  },
});

module.exports = Order;
