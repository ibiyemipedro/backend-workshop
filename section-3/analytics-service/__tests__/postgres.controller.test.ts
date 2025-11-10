import request from 'supertest';
import express from 'express';
import { PostgresController } from '../src/controllers/postgres.controller';
import { PostgresService } from '../src/services/postgres.service';

jest.mock('../src/services/postgres.service');

describe('PostgresController', () => {
  let app: express.Application;
  let postgresController: PostgresController;
  let mockPostgresService: jest.Mocked<PostgresService>;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    mockPostgresService = {
      getUserData: jest.fn(),
      getOrderAnalytics: jest.fn(),
    } as any;

    postgresController = new PostgresController();
    (postgresController as any).postgresService = mockPostgresService;

    app.get('/users', postgresController.getUserData);
    app.get('/orders', postgresController.getOrderAnalytics);
  });

  describe('GET /users', () => {
    it('should return user data successfully', async () => {
      const mockData = {
        users: [{ id: '1', firstName: 'John' }],
        summary: { totalUsers: 1, usersWithOrders: 0 },
      };

      mockPostgresService.getUserData.mockResolvedValue(mockData);

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('PostgreSQL user data retrieved successfully');
      expect(response.body.data).toEqual(mockData);
    });

    it('should handle service errors', async () => {
      const error = new Error('Service error');
      mockPostgresService.getUserData.mockRejectedValue(error);

      const response = await request(app).get('/users');

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Failed to retrieve user data: Service error');
    });
  });

  describe('GET /orders', () => {
    it('should return order analytics successfully', async () => {
      const mockData = {
        analytics: { totalOrders: 100 },
        recentOrders: [],
        summary: { totalOrdersProcessed: 0 },
      };

      mockPostgresService.getOrderAnalytics.mockResolvedValue(mockData);

      const response = await request(app).get('/orders');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('PostgreSQL order analytics retrieved successfully');
      expect(response.body.data).toEqual(mockData);
    });
  });
});