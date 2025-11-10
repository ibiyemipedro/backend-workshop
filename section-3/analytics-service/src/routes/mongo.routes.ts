import { Router } from 'express';
import { MongoController } from '../controllers/mongo.controller';

const router = Router();
const mongoController = new MongoController();

/**
 * @swagger
 * tags:
 *   name: MongoDB Analytics
 *   description: Analytics endpoints using MongoDB database
 */

/**
 * @swagger
 * /api/mongo/user-categories:
 *   get:
 *     summary: Get user category analytics from MongoDB
 *     tags: [MongoDB Analytics]
 *     responses:
 *       200:
 *         description: MongoDB user category analytics retrieved successfully
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
 *                     usersByCategory:
 *                       type: array
 *                     summary:
 *                       type: object
 *       500:
 *         description: Server error
 */
router.get('/user-categories', mongoController.getUserCategoryAnalytics);

/**
 * @swagger
 * /api/mongo/product-analytics:
 *   get:
 *     summary: Get product analytics from MongoDB
 *     tags: [MongoDB Analytics]
 *     responses:
 *       200:
 *         description: MongoDB product analytics retrieved successfully
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
 *                     productCategoryAnalytics:
 *                       type: array
 *                     orderTrends:
 *                       type: array
 *                     topCustomers:
 *                       type: array
 *                     summary:
 *                       type: object
 *       500:
 *         description: Server error
 */
router.get('/product-analytics', mongoController.getProductAnalytics);

export default router;