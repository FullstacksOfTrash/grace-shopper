const conn = require('../db');

const Review = conn.define('review', {
  rating: {
    type: conn.Sequelize.INTEGER,
    allowNull: false,
  },
  text: {
    type: conn.Sequelize.TEXT,
  },
  verfiedBuyer: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Review;