import { Router } from 'express';
import { PostgresController } from '../controllers/postgres.controller';

const router = Router();
const postgresController = new PostgresController();

/**
 * @swagger
 * tags:
 *   name: PostgreSQL Analytics
 *   description: Analytics endpoints using PostgreSQL database
 */

/**
 * @swagger
 * /api/postgres/users:
 *   get:
 *     summary: Get user data from PostgreSQL
 *     tags: [PostgreSQL Analytics]
 *     responses:
 *       200:
 *         description: PostgreSQL user data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                     summary:
 *                       type: object
 *       500:
 *         description: Server error
 */
router.get('/users', postgresController.getUserData);

/**
 * @swagger
 * /api/postgres/orders:
 *   get:
 *     summary: Get order analytics from PostgreSQL
 *     tags: [PostgreSQL Analytics]
 *     responses:
 *       200:
 *         description: PostgreSQL order analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     analytics:
 *                       type: object
 *                     recentOrders:
 *                       type: array
 *                     summary:
 *                       type: object
 *       500:
 *         description: Server error
 */
router.get('/orders', postgresController.getOrderAnalytics);

export default router;