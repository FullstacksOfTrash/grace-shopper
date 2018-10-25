const conn = require('../db');

const Product = conn.define('product', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: conn.Sequelize.INTEGER,
    allowNull: false,
  },
  imageUrl: {
    type: conn.Sequelize.TEXT,
    //allowNull: false,  commented out for now
  },
  stock: {
    type: conn.Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: conn.Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Product;
