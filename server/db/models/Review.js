const conn = require('../db');

const Review = conn.define('review', {
  rating: {
    type: conn.Sequelize.INTEGER,
  },
  text: {
    type: conn.Sequelize.TEXT,
  },
});

module.exports = Review;
