import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { createOrderSchema } from '../dtos/create-order.dto';
import { OrderStatus } from '../types/enums';
import { responseUtils } from '../utils/response.utils';

export class OrderController {
  constructor(private orderService: OrderService) { }

  createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { error } = createOrderSchema.validate(req.body);
      if (error) {
        res.status(400).json(responseUtils.error(error.details[0].message));
        return;
      }

      const order = await this.orderService.createOrder(req.body);
      res.status(201).json(responseUtils.success(order, 'Order created successfully'));
    } catch (error) {
      res.status(500).json(responseUtils.error('Failed to create order'));
    }
  };

  getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json(responseUtils.error('User not authenticated'));
        return;
      }

      const orders = await this.orderService.getUserOrders(userId);
      res.json(responseUtils.success(orders, 'Orders retrieved successfully'));
    } catch (error) {
      res.status(500).json(responseUtils.error('Failed to retrieve orders'));
    }
  };

  getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
      const orderId = parseInt(req.params.id);
      const order = await this.orderService.getOrderById(orderId);

      if (!order) {
        res.status(404).json(responseUtils.error('Order not found'));
        return;
      }

      res.json(responseUtils.success(order, 'Order retrieved successfully'));
    } catch (error) {
      res.status(500).json(responseUtils.error('Failed to retrieve order'));
    }
  };

  updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const orderId = parseInt(req.params.id);
      const { status } = req.body;

      if (!Object.values(OrderStatus).includes(status)) {
        res.status(400).json(responseUtils.error('Invalid order status'));
        return;
      }

      const order = await this.orderService.updateOrderStatus(orderId, status);

      if (!order) {
        res.status(404).json(responseUtils.error('Order not found'));
        return;
      }

      res.json(responseUtils.success(order, 'Order status updated successfully'));
    } catch (error) {
      res.status(500).json(responseUtils.error('Failed to update order status'));
    }
  };
}