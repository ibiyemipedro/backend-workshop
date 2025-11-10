import { OrderRepository } from '../repositories/order.repository';
import { OrderItemRepository } from '../repositories/order-item.repository';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../entities/order.entity';
import { OrderStatus } from '../types/enums';

export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private orderItemRepository: OrderItemRepository
  ) { }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.orderRepository.create({
      userId: createOrderDto.userId,
      status: OrderStatus.PENDING
    });

    const orderItemsData = createOrderDto.orderItems.map(item => ({
      orderId: order.id,
      productId: item.productId,
      price: item.price,
      quantity: item.quantity
    }));

    const orderItems = await this.orderItemRepository.createMany(orderItemsData);
    order.orderItems = orderItems;

    return order;
  }

  async getOrderById(id: number): Promise<Order | null> {
    return await this.orderRepository.findById(id);
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return await this.orderRepository.findByUserId(userId);
  }

  async updateOrderStatus(id: number, status: OrderStatus): Promise<Order | null> {
    return await this.orderRepository.updateStatus(id, status);
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }
}