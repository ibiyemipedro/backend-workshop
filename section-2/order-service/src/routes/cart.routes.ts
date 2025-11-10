import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import { authMiddleware } from '../utils/auth.middleware';

export const createCartRoutes = (cartController: CartController): Router => {
  const router = Router();

  /**
   * @swagger
   * /api/cart:
   *   post:
   *     summary: Add item to cart
   *     tags: [Cart]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               productId:
   *                 type: integer
   *               price:
   *                 type: number
   *               quantity:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Item added to cart successfully
   *       400:
   *         description: Invalid input
   *       401:
   *         description: Unauthorized
   */
  router.post('/', authMiddleware, cartController.addToCart);

  /**
   * @swagger
   * /api/cart:
   *   get:
   *     summary: Get user cart
   *     tags: [Cart]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Cart retrieved successfully
   *       401:
   *         description: Unauthorized
   */
  router.get('/', authMiddleware, cartController.getCart);

  /**
   * @swagger
   * /api/cart/{id}:
   *   put:
   *     summary: Update cart item quantity
   *     tags: [Cart]
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
   *               quantity:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Cart item updated successfully
   *       404:
   *         description: Cart item not found
   *       401:
   *         description: Unauthorized
   */
  router.put('/:id', authMiddleware, cartController.updateCartItem);

  /**
   * @swagger
   * /api/cart/product/{productId}:
   *   delete:
   *     summary: Remove item from cart
   *     tags: [Cart]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: productId
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Item removed from cart successfully
   *       401:
   *         description: Unauthorized
   */
  router.delete('/product/:productId', authMiddleware, cartController.removeFromCart);

  /**
   * @swagger
   * /api/cart:
   *   delete:
   *     summary: Clear user cart
   *     tags: [Cart]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Cart cleared successfully
   *       401:
   *         description: Unauthorized
   */
  router.delete('/', authMiddleware, cartController.clearCart);

  return router;
};