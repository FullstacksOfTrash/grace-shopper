const conn = require('../database');

const Category = conn.define('category', {
  name: {
    type: conn.Sequelize.STRING,
  },
});

module.exports = Category;
