import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { PgUser } from '../entities/user.entity';
import { PgCategory } from '../entities/category.entity';
import { PgProduct } from '../entities/product.entity';
import { PgOrder } from '../entities/order.entity';
import { PgOrderItem } from '../entities/order-item.entity';
import { UserRole, OrderStatus } from '../types/common.types';

export const seedPostgresData = async (dataSource: DataSource): Promise<void> => {
  console.log('🌱 Seeding PostgreSQL database...');

  const userRepository = dataSource.getRepository(PgUser);
  const categoryRepository = dataSource.getRepository(PgCategory);
  const productRepository = dataSource.getRepository(PgProduct);
  const orderRepository = dataSource.getRepository(PgOrder);
  const orderItemRepository = dataSource.getRepository(PgOrderItem);

  const users: PgUser[] = [];
  console.log('Creating 20 sample users...');
  for (let i = 0; i < 20; i++) {
    const user = userRepository.create({
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
  await userRepository.save(users);

  const categories: PgCategory[] = [];
  const categoryNames = [
    'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports',
    'Automotive', 'Beauty', 'Toys', 'Jewelry', 'Food & Beverage'
  ];

  console.log('Creating categories...');
  for (const name of categoryNames) {
    const category = categoryRepository.create({
      name,
      description: faker.lorem.paragraph(),
      tags: faker.helpers.arrayElements(['popular', 'trending', 'new', 'sale', 'featured'], 2),
    });
    categories.push(category);
  }
  await categoryRepository.save(categories);

  const products: PgProduct[] = [];
  console.log('Creating 1000 products...');
  for (let i = 0; i < 1000; i++) {
    const category = faker.helpers.arrayElement(categories);
    const product = productRepository.create({
      categoryId: category.id,
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
  await productRepository.save(products);

  const orders: PgOrder[] = [];
  console.log('Creating 5000 orders...');
  for (let i = 0; i < 5000; i++) {
    const user = faker.helpers.arrayElement(users);
    const order = orderRepository.create({
      userId: user.id,
      status: faker.helpers.arrayElement(Object.values(OrderStatus)),
    });
    orders.push(order);
  }
  await orderRepository.save(orders);

  const orderItems: PgOrderItem[] = [];
  console.log('Creating order items...');
  for (const order of orders) {
    const itemCount = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < itemCount; i++) {
      const product = faker.helpers.arrayElement(products);
      const orderItem = orderItemRepository.create({
        orderId: order.id,
        productId: product.id,
        price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
        quantity: faker.number.int({ min: 1, max: 3 }),
        status: order.status,
      });
      orderItems.push(orderItem);
    }
  }

  // Insert order items in batches to avoid PostgreSQL parameter limit
  const batchSize = 1000;
  for (let i = 0; i < orderItems.length; i += batchSize) {
    const batch = orderItems.slice(i, i + batchSize);
    await orderItemRepository.save(batch);
    console.log(`Inserted order items batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(orderItems.length / batchSize)}`);
  }

  console.log('✅ PostgreSQL seeding completed!');
};