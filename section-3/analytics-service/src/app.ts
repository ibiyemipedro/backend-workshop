import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import { connectPostgres } from './utils/postgres.config';
import { connectMongoDB } from './utils/mongo.config';
import { specs } from './utils/swagger.config';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
}));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({
    message: 'Analytics Service API',
    version: '1.0.0',
    swagger: '/api-docs',
    endpoints: {
      postgres: {
        users: '/api/postgres/users',
        orders: '/api/postgres/orders',
      },
      mongo: {
        userCategories: '/api/mongo/user-categories',
        productAnalytics: '/api/mongo/product-analytics',
      },
    },
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    timestamp: new Date().toISOString(),
  });
});

app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    timestamp: new Date().toISOString(),
  });
});

const startServer = async () => {
  try {
    console.log('🚀 Starting Analytics Service...');

    console.log('📡 Connecting to databases...');
    await Promise.all([
      connectPostgres(),
      connectMongoDB(),
    ]);

    app.listen(PORT, () => {
      console.log(`🟢 Analytics Service running on port ${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
      console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
      console.log('🎯 Available endpoints:');
      console.log(`   PostgreSQL - Users: http://localhost:${PORT}/api/postgres/users`);
      console.log(`   PostgreSQL - Orders: http://localhost:${PORT}/api/postgres/orders`);
      console.log(`   MongoDB - User Categories: http://localhost:${PORT}/api/mongo/user-categories`);
      console.log(`   MongoDB - Product Analytics: http://localhost:${PORT}/api/mongo/product-analytics`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();