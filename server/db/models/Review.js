const conn = require('../conn');

const Review = conn.define('review', {
  // id: {
  //   type: conn.Sequelize.UUID,
  //   defaultValue: conn.Sequelize.UUIDV4,
  //   primaryKey: true
  // },
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
  author: {
    type: conn.Sequelize.STRING,
    defaultValue: 'Anonymous' // because I don't want to mess with the seed data right now
  },
  verfiedBuyer: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Review;
