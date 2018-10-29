const conn = require('../conn');

const Review = conn.define('review', {
  rating: {
    type: conn.Sequelize.INTEGER,
    allowNull: false,
  },
  text: {
    type: conn.Sequelize.TEXT,
    validate: {
      atLeast20(review){
        if(review.length < 20){
          throw new Error('Review must contain at least 20 characters')
        }
      }
    },
  },
  verfiedBuyer: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Review;
