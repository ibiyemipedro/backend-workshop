import { DataSource } from 'typeorm';
import { PgUser } from '../entities/user.entity';
import { PgCategory } from '../entities/category.entity';
import { PgProduct } from '../entities/product.entity';
import { PgOrder } from '../entities/order.entity';
import { PgOrderItem } from '../entities/order-item.entity';

export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DATABASE || 'analytics_db',
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [PgUser, PgCategory, PgProduct, PgOrder, PgOrderItem],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

export const connectPostgres = async (): Promise<void> => {
  try {
    await postgresDataSource.initialize();
    console.log('PostgreSQL connected successfully');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    throw error;
  }
};

export const disconnectPostgres = async (): Promise<void> => {
  try {
    await postgresDataSource.destroy();
    console.log('PostgreSQL disconnected successfully');
  } catch (error) {
    console.error('Error disconnecting from PostgreSQL:', error);
  }
};