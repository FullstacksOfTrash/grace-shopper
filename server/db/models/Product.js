const conn = require('../conn');
const defaultProductImage = require('../../../public/images/defaultProductImage')

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
    defaultValue: defaultProductImage
    //allowNull: false,  commented out for now
  },
  smallImageUrl: {
    type: conn.Sequelize.TEXT,
    defaultValue: defaultProductImage
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
