import 'reflect-metadata';
import dotenv from 'dotenv';
import { connectPostgres, postgresDataSource } from '../utils/postgres.config';
import { connectMongoDB } from '../utils/mongo.config';
import { seedPostgresData } from './postgres.seed';
import { seedMongoData } from './mongo.seed';

dotenv.config();

const runSeeds = async (): Promise<void> => {
  try {
    console.log('🌱 Starting database seeding...');

    console.log('📡 Connecting to databases...');
    await connectPostgres();
    await connectMongoDB();

    console.log('🧹 Running migrations...');
    await postgresDataSource.runMigrations();

    console.log('📊 Seeding PostgreSQL...');
    await seedPostgresData(postgresDataSource);

    console.log('🍃 Seeding MongoDB...');
    await seedMongoData();

    console.log('🎉 All seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

runSeeds();