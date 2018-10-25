const conn = require('../conn');

const LineItem = conn.define('lineItem', {
  quantity: {
    type: conn.Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = LineItem;
