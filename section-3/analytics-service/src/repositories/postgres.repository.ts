import { Repository } from 'typeorm';
import { PgUser } from '../entities/user.entity';
import { PgOrder } from '../entities/order.entity';
import { PgProduct } from '../entities/product.entity';
import { postgresDataSource } from '../utils/postgres.config';

export class PostgresRepository {
  private userRepository: Repository<PgUser>;
  private orderRepository: Repository<PgOrder>;
  private productRepository: Repository<PgProduct>;

  constructor() {
    this.userRepository = postgresDataSource.getRepository(PgUser);
    this.orderRepository = postgresDataSource.getRepository(PgOrder);
    this.productRepository = postgresDataSource.getRepository(PgProduct);
  }

  async getAllUsers(): Promise<PgUser[]> {
    return this.userRepository.find({
      relations: ['orders'],
      take: 100,
    });
  }

  async getUserOrders(): Promise<any[]> {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.product', 'product')
      .select([
        'order.id',
        'order.status',
        'order.createdAt',
        'user.firstName',
        'user.lastName',
        'user.email',
        'orderItems.quantity',
        'orderItems.price',
        'product.title',
        'product.price',
      ])
      .orderBy('order.createdAt', 'DESC')
      .limit(100)
      .getMany();
  }

  async getProductSales(): Promise<any[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.orderItems', 'orderItems')
      .select([
        'product.id',
        'product.title',
        'product.price',
        'COUNT(orderItems.id) as sales_count',
        'SUM(orderItems.quantity) as total_quantity_sold',
        'SUM(orderItems.price * orderItems.quantity) as total_revenue',
      ])
      .groupBy('product.id')
      .orderBy('total_revenue', 'DESC')
      .limit(50)
      .getRawMany();
  }

  async getOrderAnalytics(): Promise<any> {
    const totalOrders = await this.orderRepository.count();
    const totalRevenue = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.orderItems', 'orderItems')
      .select('SUM(orderItems.price * orderItems.quantity)', 'total')
      .getRawOne();

    const ordersByStatus = await this.orderRepository
      .createQueryBuilder('order')
      .select('order.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('order.status')
      .getRawMany();

    return {
      totalOrders,
      totalRevenue: totalRevenue.total || 0,
      ordersByStatus,
    };
  }
}