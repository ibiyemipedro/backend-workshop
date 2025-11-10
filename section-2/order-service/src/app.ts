import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { initializeDatabase, AppDataSource } from './utils/database';
import { OrderRepository } from './repositories/order.repository';
import { OrderItemRepository } from './repositories/order-item.repository';
import { CartRepository } from './repositories/cart.repository';
import { OrderService } from './services/order.service';
import { CartService } from './services/cart.service';
import { OrderController } from './controllers/order.controller';
import { CartController } from './controllers/cart.controller';
import { createOrderRoutes } from './routes/order.routes';
import { createCartRoutes } from './routes/cart.routes';
import { swaggerSpec } from './utils/swagger.config';
import { responseUtils } from './utils/response.utils';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json(responseUtils.success({ status: 'healthy', timestamp: new Date().toISOString() }));
});

// Swagger documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Initialize services and routes
const initializeApp = async () => {
  try {
    await initializeDatabase();

    // Initialize repositories
    const orderRepository = new OrderRepository(AppDataSource);
    const orderItemRepository = new OrderItemRepository(AppDataSource);
    const cartRepository = new CartRepository(AppDataSource);

    // Initialize services
    const orderService = new OrderService(orderRepository, orderItemRepository);
    const cartService = new CartService(cartRepository);

    // Initialize controllers
    const orderController = new OrderController(orderService);
    const cartController = new CartController(cartService);

    // Setup routes
    app.use('/api/orders', createOrderRoutes(orderController));
    app.use('/api/cart', createCartRoutes(cartController));

    // 404 handler
    app.use('*', (req, res) => {
      res.status(404).json(responseUtils.error('Endpoint not found'));
    });

    // Error handler
    app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('Unhandled error:', error);
      res.status(500).json(responseUtils.error('Internal server error'));
    });

    app.listen(PORT, () => {
      console.log(`Order Service running on port ${PORT}`);
      console.log(`API Documentation: http://localhost:${PORT}/api/docs`);
      console.log(`Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to initialize application:', error);
    process.exit(1);
  }
};

initializeApp();