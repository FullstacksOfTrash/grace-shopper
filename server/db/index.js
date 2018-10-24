const Category = require('./models/Category');
const LineItem = require('./models/LineItem');
const Order = require('./models/Order');
const Product = require('./models/Product');
const Review = require('./models/Review');
const User = require('./models/User');

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

Product.hasMany(LineItem);
LineItem.belongsTo(Product);

Order.hasMany(LineItem);
LineItem.belongsTo(Order);

Category.belongsToMany(Product, { through: 'productTable' });
Product.belongsToMany(Category, { through: 'productTable' });

module.exports = {
  models: {
    Category,
    LineItem,
    Order,
    Product,
    Review,
    User,
  },
};
