import { OrderService } from '../src/services/order.service';
import { OrderRepository } from '../src/repositories/order.repository';
import { OrderItemRepository } from '../src/repositories/order-item.repository';
import { CreateOrderDto } from '../src/dtos/create-order.dto';
import { OrderStatus } from '../src/types/enums';

jest.mock('../src/repositories/order.repository');
jest.mock('../src/repositories/order-item.repository');

describe('OrderService', () => {
  let orderService: OrderService;
  let mockOrderRepository: jest.Mocked<OrderRepository>;
  let mockOrderItemRepository: jest.Mocked<OrderItemRepository>;

  beforeEach(() => {
    mockOrderRepository = new OrderRepository({} as any) as jest.Mocked<OrderRepository>;
    mockOrderItemRepository = new OrderItemRepository({} as any) as jest.Mocked<OrderItemRepository>;
    orderService = new OrderService(mockOrderRepository, mockOrderItemRepository);
  });

  describe('createOrder', () => {
    it('should create an order successfully', async () => {
      const createOrderDto: CreateOrderDto = {
        userId: 1,
        orderItems: [
          { productId: 1, price: 10.99, quantity: 2 },
          { productId: 2, price: 5.50, quantity: 1 }
        ]
      };

      const mockOrder = {
        id: 1,
        userId: 1,
        status: OrderStatus.PENDING,
        orderItems: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const mockOrderItems = [
        { id: 1, orderId: 1, productId: 1, price: 10.99, quantity: 2 },
        { id: 2, orderId: 1, productId: 2, price: 5.50, quantity: 1 }
      ];

      mockOrderRepository.create.mockResolvedValue(mockOrder as any);
      mockOrderItemRepository.createMany.mockResolvedValue(mockOrderItems as any);

      const result = await orderService.createOrder(createOrderDto);

      expect(mockOrderRepository.create).toHaveBeenCalledWith({
        userId: 1,
        status: OrderStatus.PENDING
      });
      expect(mockOrderItemRepository.createMany).toHaveBeenCalled();
      expect(result.userId).toBe(1);
      expect(result.status).toBe(OrderStatus.PENDING);
    });
  });

  describe('getOrderById', () => {
    it('should return an order by id', async () => {
      const mockOrder = { id: 1, userId: 1, status: OrderStatus.PENDING };
      mockOrderRepository.findById.mockResolvedValue(mockOrder as any);

      const result = await orderService.getOrderById(1);

      expect(mockOrderRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockOrder);
    });
  });

  describe('getUserOrders', () => {
    it('should return user orders', async () => {
      const mockOrders = [
        { id: 1, userId: 1, status: OrderStatus.PENDING },
        { id: 2, userId: 1, status: OrderStatus.CONFIRMED }
      ];
      mockOrderRepository.findByUserId.mockResolvedValue(mockOrders as any);

      const result = await orderService.getUserOrders(1);

      expect(mockOrderRepository.findByUserId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockOrders);
    });
  });
});