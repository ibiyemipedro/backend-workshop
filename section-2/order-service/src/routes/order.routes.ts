import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authMiddleware } from '../utils/auth.middleware';

export const createOrderRoutes = (orderController: OrderController): Router => {
  const router = Router();

  /**
   * @swagger
   * /api/orders:
   *   post:
   *     summary: Create a new order
   *     tags: [Orders]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               userId:
   *                 type: integer
   *               orderItems:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     productId:
   *                       type: integer
   *                     price:
   *                       type: number
   *                     quantity:
   *                       type: integer
   *     responses:
   *       201:
   *         description: Order created successfully
   *       400:
   *         description: Invalid input
   *       401:
   *         description: Unauthorized
   */
  router.post('/', authMiddleware, orderController.createOrder);

  /**
   * @swagger
   * /api/orders:
   *   get:
   *     summary: Get user orders
   *     tags: [Orders]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Orders retrieved successfully
   *       401:
   *         description: Unauthorized
   */
  router.get('/', authMiddleware, orderController.getOrders);

  /**
   * @swagger
   * /api/orders/{id}:
   *   get:
   *     summary: Get order by ID
   *     tags: [Orders]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Order retrieved successfully
   *       404:
   *         description: Order not found
   *       401:
   *         description: Unauthorized
   */
  router.get('/:id', authMiddleware, orderController.getOrderById);

  /**
   * @swagger
   * /api/orders/{id}/status:
   *   put:
   *     summary: Update order status
   *     tags: [Orders]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               status:
   *                 type: string
   *                 enum: [pending, confirmed, processing, shipped, delivered, cancelled]
   *     responses:
   *       200:
   *         description: Order status updated successfully
   *       404:
   *         description: Order not found
   *       401:
   *         description: Unauthorized
   */
  router.put('/:id/status', authMiddleware, orderController.updateOrderStatus);

  return router;
};