const conn = require('../conn');

const Category = conn.define('category', {
  name: {
    type: conn.Sequelize.STRING,
  },
});

module.exports = Category;
