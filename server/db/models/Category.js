const conn = require('../db');

const Category = conn.define('category', {
  name: {
    type: conn.Sequelize.STRING,
  },
});

module.exports = Category;
