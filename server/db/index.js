const conn = require('./conn');
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

Product.belongsTo(Category)

Category.belongsToMany(Product, { through: 'productTable' });
Product.belongsToMany(Category, { through: 'productTable' });

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, harry, jarret, cang, zi] = await Promise.all([
    User.create({
      firstName: 'Moe',
      lastName: 'Howard',
      email: 'moe@moe.com',
      password: 'MOE',
      address: 'addressPlaceholder',
      // admin: false // ensure this is false by default
    }),
    User.create({
      firstName: 'Harry',
      lastName: 'Chen',
      email: 'harry@harry.com',
      password: 'HARRY',
      address: 'Harry Street',
      admin: true,
    }),
    User.create({
      firstName: 'Jarret',
      lastName: 'Rose',
      email: 'jarret@jarret.com',
      password: 'JARRET',
      address: 'Jarret Street',
      admin: true,
    }),
    User.create({
      firstName: 'Cang',
      lastName: 'Truong',
      email: 'cang@cang.com',
      password: 'CANG',
      address: 'Cang Street',
      admin: true,
    }),
    User.create({
      firstName: 'Zi',
      lastName: 'Yan',
      email: 'zi@zi.com',
      password: 'ZI',
      address: 'Zi Street',
      admin: true,
    }),
  ]);
  const [order1, order2, order3, order4, order5, order6] = await Promise.all([
    Order.create({
      status: 'CART',
      userId: moe.id,
    }),
    Order.create({
      status: 'ORDER',
      userId: moe.id,
    }),
    Order.create({
      status: 'CART',
      userId: harry.id,
    }),
    Order.create({
      status: 'CART',
      userId: jarret.id,
    }),
    Order.create({
      status: 'CART',
      userId: cang.id,
    }),
    Order.create({
      status: 'CART',
      userId: zi.id,
    }),
  ]);
  const [computers, tablets, phones, onSale] = await Promise.all([
    Category.create({ name: 'Computers' }),
    Category.create({ name: 'Tablets' }),
    Category.create({ name: 'Phones' }),
    Category.create({ name: 'On Sale' }),
  ]);
  const [macbook, macbookPro, ipad, ipadPro, iphone] = await Promise.all([
    Product.create({
      name: "Bike Once Ridden by Steve Jobs",
      imageUrl: '/images/bmxbike_small.jpg',
      price: 100,
      stock: 200,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
    Product.create({
      name: "Mid-Sized Giant's Chopsticks",
      imageUrl: '/images/crutches_small.jpg',
      price: 25,
      stock: 300,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
    Product.create({
      name: 'Doll Pooped On By Pigeon (Only Once)',
      imageUrl: '/images/doll_small.jpg',
      price: 50,
      stock: 200,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
    Product.create({
      name: "19th Century Duchess's Bedpan",
      imageUrl: '/images/protestsign_small.jpg',
      price: 100,
      stock: 200,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
    Product.create({
      name: 'Coke Soda with Traces of Dog Poop',
      imageUrl: '/images/sodacan_small.jpg',
      price: 300,
      stock: 200,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
    Product.create({
      name: 'Sandcastle From Backyard',
      imageUrl: '/images/whiskeybottle_small.jpg',
      price: 300,
      stock: 0,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
  ]);

  await Promise.all([
    macbook.setCategory(computers),
    macbookPro.setCategory(computers),
    ipad.setCategory(tablets),
    ipadPro.setCategory(tablets),
    iphone.setCategory(phones),
    iphone.setCategory(onSale),
    ipad.setCategory(onSale)
  ]);
  const [l1, l2, l3] = await Promise.all([
    LineItem.create({ productId: ipad.id, orderId: order1.id, quantity: 4 }),
    LineItem.create({ productId: macbook.id, orderId: order2.id, quantity: 3 }),
    LineItem.create({ productId: iphone.id, orderId: order2.id, quantity: 1 }),
  ]);
  const [review1, review2] = await Promise.all([
    Review.create({
      productId: macbookPro.id,
      author: "Moe Howard",
      userId: moe.id,
      rating: 5,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      // verfiedBuyer: true, // not sure this should be hardcoded here... may make sense to set this with a sequelize hook
    }),
    Review.create({
      productId: ipadPro.id,
      author: "Harry Chen",
      userId: harry.id,
      rating: 6,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    }),
  ]);
};
module.exports = {
  syncAndSeed,
  Category,
  LineItem,
  Order,
  Product,
  Review,
  User,
};

// module.exports = {
//   syncAndSeed,
//   models: {
//     Category,
//     LineItem,
//     Order,
//     Product,
//     Review,
//     User,
//   },
// };
