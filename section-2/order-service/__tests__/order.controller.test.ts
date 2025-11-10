import request from 'supertest';
import express from 'express';
import { OrderController } from '../src/controllers/order.controller';
import { OrderService } from '../src/services/order.service';
import { createOrderRoutes } from '../src/routes/order.routes';
import { OrderStatus } from '../src/types/enums';

jest.mock('../src/services/order.service');

describe('OrderController', () => {
  let app: express.Application;
  let mockOrderService: jest.Mocked<OrderService>;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    mockOrderService = {
      createOrder: jest.fn(),
      getOrderById: jest.fn(),
      getUserOrders: jest.fn(),
      updateOrderStatus: jest.fn(),
      getAllOrders: jest.fn()
    } as any;

    // Mock auth middleware
    app.use((req: any, res, next) => {
      req.user = { id: 1, email: 'test@example.com' };
      next();
    });

    const orderController = new OrderController(mockOrderService);
    app.use('/api/orders', createOrderRoutes(orderController));
  });

  describe('POST /api/orders', () => {
    it('should create an order successfully', async () => {
      const orderData = {
        userId: 1,
        orderItems: [
          { productId: 1, price: 10.99, quantity: 2 }
        ]
      };

      const mockOrder = {
        id: 1,
        userId: 1,
        status: OrderStatus.PENDING,
        orderItems: []
      };

      mockOrderService.createOrder.mockResolvedValue(mockOrder as any);

      const response = await request(app)
        .post('/api/orders')
        .send(orderData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Order created successfully');
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(orderData);
    });

    it('should return validation error for invalid data', async () => {
      const invalidOrderData = {
        userId: 'invalid',
        orderItems: []
      };

      const response = await request(app)
        .post('/api/orders')
        .send(invalidOrderData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(mockOrderService.createOrder).not.toHaveBeenCalled();
    });
  });

  describe('GET /api/orders', () => {
    it('should get user orders', async () => {
      const mockOrders = [
        { id: 1, userId: 1, status: OrderStatus.PENDING }
      ];

      mockOrderService.getUserOrders.mockResolvedValue(mockOrders as any);

      const response = await request(app)
        .get('/api/orders')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockOrders);
      expect(mockOrderService.getUserOrders).toHaveBeenCalledWith(1);
    });
  });
});