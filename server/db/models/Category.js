const conn = require('../conn');

const Category = conn.define('category', {
  // id: {
  //   type: conn.Sequelize.UUID,
  //   defaultValue: conn.Sequelize.UUIDV4,
  //   primaryKey: true
  // },
  name: {
    type: conn.Sequelize.STRING,
  },
});

module.exports = Category;
