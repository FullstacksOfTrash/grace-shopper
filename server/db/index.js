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

Category.belongsToMany(Product, { through: 'productTable' });
Product.belongsToMany(Category, { through: 'productTable' });

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
  const [electronics, food, essentials, alcoholic] = await Promise.all([
    Category.create({ name: 'Trashtronics (electronics)' }),
    Category.create({ name: 'Edible Trash' }),
    Category.create({ name: 'Essential Trash' }),
    Category.create({ name: 'Alcoholic Trash' }),
  ]);
  const [iTrash, leftOver, newTrash, unused, Jack] = await Promise.all([
    Product.create({
      name: 'iTrash',
      price: 100,
      imageUrl: 'eros in cursus turpis massa tincidunt dui ut ornare lectus',
      stock: 200,
      description: 'eros in cursus turpis massa tincidunt dui ut ornare lectus',
    }),
    Product.create({
      name: 'Leftover Trash',
      price: 25,
      imageUrl: 'eros in cursus turpis massa tincidunt dui ut ornare lectus',
      stock: 300,
      description: 'eros in cursus turpis massa tincidunt dui ut ornare lectus',
    }),
    Product.create({
      name: 'New Trash',
      price: 50,
      imageUrl: 'eros in cursus turpis massa tincidunt dui ut ornare lectus',
      stock: 200,
      description: 'eros in cursus turpis massa tincidunt dui ut ornare lectus',
    }),
    Product.create({
      name: 'Unused Trash(never used, was thrown away)',
      price: 100,
      imageUrl: 'eros in cursus turpis massa tincidunt dui ut ornare lectus',
      stock: 200,
      description:
        'enim facilisis gravida neque convallis a cras semper auctor neque',
    }),
    Product.create({
      name: 'Jack Trash',
      price: 300,
      imageUrl: 'erat velit scelerisque in dictum non consectetur a erat nam.',
      stock: 200,
      description:
        'elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi',
    }),
  ]);

  await Promise.all([
    electronics.addProduct(iTrash),
    food.addProduct(leftOver),
    alcoholic.addProduct(Jack),
    essentials.addProduct(newTrash),
    essentials.addProduct(unused),
  ]);

  const [l1, l2, l3] = await Promise.all([
    LineItem.create({ productId: iTrash.id, orderId: order2.id, quantity: 4 }),
    LineItem.create({ productId: Jack.id, orderId: order3.id, quantity: 3 }),
    LineItem.create({ productId: unused.id, orderId: order3.id, quantity: 1 }),
  ]);
  const [scottReview, MikeReview] = await Promise.all([
    Review.create({
      productId: Jack.id,
      userId: Scott.id,
      rating: 5,
      text: 'consectetur adipiscing elit pellentesque habitant',
      verfiedBuyer: true,
    }),
    Review.create({
      productId: iTrash.id,
      userId: Mikey.id,
      rating: 6,
      text: 'consectetur adipiscing elit pellentesque habitant',
    }),
  ]);
  return {
    users: [Scott, Mikey],
    products: [iTrash, leftOver, newTrash, unused, Jack],
    categories: [electronics, food, essentials, alcoholic],
    orders: [order1, order2, order3],
    lineItems: [l1, l2, l3],
    reviews: [scottReview, MikeReview],
  };
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
