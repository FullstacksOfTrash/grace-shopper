const conn = require('./db');
const Category = require('./models/Category');
const LineItem = require('./models/LineItem');
const Order = require('./models/Order');
const Product = require('./models/Product');
const Review = require('./models/Review');
const User = require('./models/User');

User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

Order.hasMany(LineItem);
LineItem.belongsTo(Order);

// Product.belongsToMany(Category);
// Category.hasMany(Product);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [Scott, Mikey] = await Promise.all([
    User.create({
      firstName: 'Scott',
      lastName: 'McTrashy',
      email: 'scootmctrashy@gmail.com',
      password: 'smt',
      address: '2647 Stillwell Ave, Brooklyn, NY 11223',
    }),
    User.create({
      firstName: 'Mikey',
      lastName: 'LovesTrash',
      email: 'miketrash@gmail.com',
      password: 'mt',
      address: '1324 Forest Ave, Staten Island, NY 10302',
      admin: true,
    }),
  ]);
  const [order1, order2, order3] = await Promise.all([
    Order.create({
      status: 'CART',
      userId: Scott.id,
    }),
    Order.create({
      status: 'ORDER',
      userId: Scott.id,
    }),
    Order.create({
      status: 'CART',
      userId: Mikey.id,
    }),
  ]);
};

module.exports = {
  syncAndSeed,
  models: {
    Category,
    LineItem,
    Order,
    Product,
    Review,
    User,
  },
};
