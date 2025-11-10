import { DataSource, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderStatus } from '../types/enums';

export class OrderRepository {
  private repository: Repository<Order>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Order);
  }

  async create(orderData: Partial<Order>): Promise<Order> {
    const order = this.repository.create(orderData);
    return await this.repository.save(order);
  }

  async findById(id: number): Promise<Order | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['orderItems']
    });
  }

  async findByUserId(userId: number): Promise<Order[]> {
    return await this.repository.find({
      where: { userId },
      relations: ['orderItems'],
      order: { createdAt: 'DESC' }
    });
  }

  async updateStatus(id: number, status: OrderStatus): Promise<Order | null> {
    await this.repository.update(id, { status });
    return await this.findById(id);
  }

  async findAll(): Promise<Order[]> {
    return await this.repository.find({
      relations: ['orderItems'],
      order: { createdAt: 'DESC' }
    });
  }
}