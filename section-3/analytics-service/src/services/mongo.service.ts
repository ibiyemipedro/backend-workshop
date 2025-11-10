import { MongoRepository } from '../repositories/mongo.repository';

export class MongoService {
  private mongoRepository: MongoRepository;

  constructor() {
    this.mongoRepository = new MongoRepository();
  }

  async getUserCategoryAnalytics() {
    try {
      const users = await this.mongoRepository.getAllUsers();
      const usersByCategory = await this.mongoRepository.getUsersByCategory();

      return {
        users: users.slice(0, 20),
        usersByCategory,
        summary: {
          totalUsers: users.length,
          categoriesAnalyzed: usersByCategory.length,
          generatedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Error fetching user category analytics: ${errorMessage}`);
    }
  }

  async getProductAnalytics() {
    try {
      const productCategoryAnalytics = await this.mongoRepository.getProductCategoryAnalytics();
      const orderTrends = await this.mongoRepository.getOrderTrends();
      const userOrderStats = await this.mongoRepository.getUserOrderStats();

      return {
        productCategoryAnalytics,
        orderTrends,
        topCustomers: userOrderStats.slice(0, 10),
        summary: {
          categoriesAnalyzed: productCategoryAnalytics.length,
          trendPeriodsAnalyzed: orderTrends.length,
          topCustomersCount: userOrderStats.slice(0, 10).length,
          generatedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Error fetching product analytics: ${errorMessage}`);
    }
  }
}