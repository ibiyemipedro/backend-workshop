import { faker } from '@faker-js/faker';
import { MongoUser } from '../models/user.model';
import { MongoCategory } from '../models/category.model';
import { MongoProduct } from '../models/product.model';
import { MongoOrder } from '../models/order.model';
import { MongoOrderItem } from '../models/order-item.model';
import { UserRole, OrderStatus } from '../types/common.types';

export const seedMongoData = async (): Promise<void> => {
  console.log('🌱 Seeding MongoDB database...');

  await MongoUser.deleteMany({});
  await MongoCategory.deleteMany({});
  await MongoProduct.deleteMany({});
  await MongoOrder.deleteMany({});
  await MongoOrderItem.deleteMany({});

  const users = [];
  console.log('Creating 20 sample users...');
  for (let i = 0; i < 20; i++) {
    const user = new MongoUser({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
      mobile: {
        countryCode: '+1',
        number: faker.phone.number('##########'),
      },
      dateOfBirth: faker.date.past({ years: 50 }),
      password: faker.internet.password(),
      addresses: [
        {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: faker.location.country(),
          isPreferred: true,
        },
      ],
      role: i < 2 ? UserRole.ADMIN : UserRole.USER,
    });
    users.push(user);
  }
  await MongoUser.insertMany(users);

  const categoryNames = [
    'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports',
    'Automotive', 'Beauty', 'Toys', 'Jewelry', 'Food & Beverage'
  ];

  const categories = [];
  console.log('Creating categories...');
  for (const name of categoryNames) {
    const category = new MongoCategory({
      name,
      description: faker.lorem.paragraph(),
      tags: faker.helpers.arrayElements(['popular', 'trending', 'new', 'sale', 'featured'], 2),
    });
    categories.push(category);
  }
  await MongoCategory.insertMany(categories);

  const products = [];
  console.log('Creating 1000 products...');
  for (let i = 0; i < 1000; i++) {
    const category = faker.helpers.arrayElement(categories);
    const product = new MongoProduct({
      categoryId: category._id,
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      summary: faker.lorem.sentence(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
      images: faker.helpers.arrayElements([
        faker.image.url(),
        faker.image.url(),
        faker.image.url(),
      ], faker.number.int({ min: 1, max: 3 })),
      tags: faker.helpers.arrayElements(['quality', 'durable', 'premium', 'bestseller', 'eco-friendly'], 2),
    });
    products.push(product);
  }
  await MongoProduct.insertMany(products);

  const orders = [];
  console.log('Creating 5000 orders...');
  for (let i = 0; i < 5000; i++) {
    const user = faker.helpers.arrayElement(users);
    const order = new MongoOrder({
      userId: user._id,
      status: faker.helpers.arrayElement(Object.values(OrderStatus)),
    });
    orders.push(order);
  }
  await MongoOrder.insertMany(orders);

  const orderItems = [];
  console.log('Creating order items...');
  for (const order of orders) {
    const itemCount = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < itemCount; i++) {
      const product = faker.helpers.arrayElement(products);
      const orderItem = new MongoOrderItem({
        orderId: order._id,
        productId: product._id,
        price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
        quantity: faker.number.int({ min: 1, max: 3 }),
        status: order.status,
      });
      orderItems.push(orderItem);
    }
  }
  await MongoOrderItem.insertMany(orderItems);

  console.log('✅ MongoDB seeding completed!');
};