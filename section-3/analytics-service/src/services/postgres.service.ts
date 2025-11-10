import { PostgresRepository } from '../repositories/postgres.repository';

export class PostgresService {
  private postgresRepository: PostgresRepository;

  constructor() {
    this.postgresRepository = new PostgresRepository();
  }

  async getUserData() {
    try {
      const users = await this.postgresRepository.getAllUsers();
      return {
        users,
        summary: {
          totalUsers: users.length,
          usersWithOrders: users.filter(user => user.orders && user.orders.length > 0).length,
        },
      };
    } catch (error) {
      throw new Error(`Error fetching user data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getOrderAnalytics() {
    try {
      const orderAnalytics = await this.postgresRepository.getOrderAnalytics();
      const userOrders = await this.postgresRepository.getUserOrders();

      return {
        analytics: orderAnalytics,
        recentOrders: userOrders.slice(0, 20),
        summary: {
          totalOrdersProcessed: userOrders.length,
          analyticsGenerated: new Date().toISOString(),
        },
      };
    } catch (error) {
      throw new Error(`Error fetching order analytics: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}