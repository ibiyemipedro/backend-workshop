import { DataSource, Repository } from 'typeorm';
import { OrderItem } from '../entities/order-item.entity';
import { OrderItemStatus } from '../types/enums';

export class OrderItemRepository {
  private repository: Repository<OrderItem>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(OrderItem);
  }

  async create(orderItemData: Partial<OrderItem>): Promise<OrderItem> {
    const orderItem = this.repository.create(orderItemData);
    return await this.repository.save(orderItem);
  }

  async createMany(orderItemsData: Partial<OrderItem>[]): Promise<OrderItem[]> {
    const orderItems = this.repository.create(orderItemsData);
    return await this.repository.save(orderItems);
  }

  async findByOrderId(orderId: number): Promise<OrderItem[]> {
    return await this.repository.find({
      where: { orderId },
      order: { createdAt: 'ASC' }
    });
  }

  async updateStatus(id: number, status: OrderItemStatus): Promise<OrderItem | null> {
    await this.repository.update(id, { status });
    return await this.repository.findOne({ where: { id } });
  }

  async findById(id: number): Promise<OrderItem | null> {
    return await this.repository.findOne({ where: { id } });
  }
}