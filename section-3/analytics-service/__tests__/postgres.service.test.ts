import { PostgresService } from '../src/services/postgres.service';
import { PostgresRepository } from '../src/repositories/postgres.repository';

jest.mock('../src/repositories/postgres.repository');

describe('PostgresService', () => {
  let postgresService: PostgresService;
  let mockPostgresRepository: jest.Mocked<PostgresRepository>;

  beforeEach(() => {
    mockPostgresRepository = {
      getAllUsers: jest.fn(),
      getUserOrders: jest.fn(),
      getOrderAnalytics: jest.fn(),
    } as any;

    postgresService = new PostgresService();
    (postgresService as any).postgresRepository = mockPostgresRepository;
  });

  describe('getUserData', () => {
    it('should return user data with summary', async () => {
      const mockUsers = [
        { id: '1', firstName: 'John', orders: [{ id: '1' }] },
        { id: '2', firstName: 'Jane', orders: [] },
      ];

      mockPostgresRepository.getAllUsers.mockResolvedValue(mockUsers as any);

      const result = await postgresService.getUserData();

      expect(result).toEqual({
        users: mockUsers,
        summary: {
          totalUsers: 2,
          usersWithOrders: 1,
        },
      });
      expect(mockPostgresRepository.getAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should handle errors and throw descriptive message', async () => {
      const error = new Error('Database connection failed');
      mockPostgresRepository.getAllUsers.mockRejectedValue(error);

      await expect(postgresService.getUserData()).rejects.toThrow('Error fetching user data: Database connection failed');
    });
  });

  describe('getOrderAnalytics', () => {
    it('should return order analytics with recent orders', async () => {
      const mockAnalytics = { totalOrders: 100, totalRevenue: 5000 };
      const mockOrders = [{ id: '1', status: 'completed' }, { id: '2', status: 'pending' }];

      mockPostgresRepository.getOrderAnalytics.mockResolvedValue(mockAnalytics);
      mockPostgresRepository.getUserOrders.mockResolvedValue(mockOrders as any);

      const result = await postgresService.getOrderAnalytics();

      expect(result.analytics).toEqual(mockAnalytics);
      expect(result.recentOrders).toHaveLength(2);
      expect(result.summary.totalOrdersProcessed).toBe(2);
    });

    it('should handle errors and throw descriptive message', async () => {
      const error = new Error('Query failed');
      mockPostgresRepository.getOrderAnalytics.mockRejectedValue(error);

      await expect(postgresService.getOrderAnalytics()).rejects.toThrow('Error fetching order analytics: Query failed');
    });
  });
});