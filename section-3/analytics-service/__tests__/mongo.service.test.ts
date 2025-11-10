import { MongoService } from '../src/services/mongo.service';
import { MongoRepository } from '../src/repositories/mongo.repository';

jest.mock('../src/repositories/mongo.repository');

describe('MongoService', () => {
  let mongoService: MongoService;
  let mockMongoRepository: jest.Mocked<MongoRepository>;

  beforeEach(() => {
    mockMongoRepository = {
      getAllUsers: jest.fn(),
      getUsersByCategory: jest.fn(),
      getProductCategoryAnalytics: jest.fn(),
      getOrderTrends: jest.fn(),
      getUserOrderStats: jest.fn(),
    } as any;

    mongoService = new MongoService();
    (mongoService as any).mongoRepository = mockMongoRepository;
  });

  describe('getUserCategoryAnalytics', () => {
    it('should return user category analytics', async () => {
      const mockUsers = [
        { _id: '1', firstName: 'John', lastName: 'Doe' },
        { _id: '2', firstName: 'Jane', lastName: 'Smith' },
      ];
      const mockUsersByCategory = [
        { _id: 'Electronics', userCount: 5 },
        { _id: 'Clothing', userCount: 3 },
      ];

      mockMongoRepository.getAllUsers.mockResolvedValue(mockUsers);
      mockMongoRepository.getUsersByCategory.mockResolvedValue(mockUsersByCategory);

      const result = await mongoService.getUserCategoryAnalytics();

      expect(result.users).toHaveLength(2);
      expect(result.usersByCategory).toEqual(mockUsersByCategory);
      expect(result.summary.totalUsers).toBe(2);
      expect(result.summary.categoriesAnalyzed).toBe(2);
    });

    it('should handle errors gracefully', async () => {
      const error = new Error('MongoDB connection failed');
      mockMongoRepository.getAllUsers.mockRejectedValue(error);

      await expect(mongoService.getUserCategoryAnalytics()).rejects.toThrow(
        'Error fetching user category analytics: MongoDB connection failed'
      );
    });
  });

  describe('getProductAnalytics', () => {
    it('should return comprehensive product analytics', async () => {
      const mockProductAnalytics = [
        { _id: 'Electronics', productCount: 100, averagePrice: 250 },
      ];
      const mockOrderTrends = [
        { _id: { year: 2023, month: 11 }, totalOrders: 50 },
      ];
      const mockUserStats = [
        { firstName: 'John', totalSpent: 1500 },
        { firstName: 'Jane', totalSpent: 1200 },
      ];

      mockMongoRepository.getProductCategoryAnalytics.mockResolvedValue(mockProductAnalytics);
      mockMongoRepository.getOrderTrends.mockResolvedValue(mockOrderTrends);
      mockMongoRepository.getUserOrderStats.mockResolvedValue(mockUserStats);

      const result = await mongoService.getProductAnalytics();

      expect(result.productCategoryAnalytics).toEqual(mockProductAnalytics);
      expect(result.orderTrends).toEqual(mockOrderTrends);
      expect(result.topCustomers).toHaveLength(2);
      expect(result.summary.categoriesAnalyzed).toBe(1);
    });

    it('should handle errors with unknown error types', async () => {
      mockMongoRepository.getProductCategoryAnalytics.mockRejectedValue('String error');

      await expect(mongoService.getProductAnalytics()).rejects.toThrow(
        'Error fetching product analytics: Unknown error'
      );
    });
  });
});