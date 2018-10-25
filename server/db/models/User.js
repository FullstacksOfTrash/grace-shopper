const conn = require('../conn');

const User = conn.define('user', {
  firstName: {
    type: conn.Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: conn.Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: conn.Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: conn.Sequelize.STRING,
    allowNull: false,
  },
  admin: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
