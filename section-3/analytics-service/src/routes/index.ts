import { Router } from 'express';
import postgresRoutes from './postgres.routes';
import mongoRoutes from './mongo.routes';

const router = Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 timestamp:
 *                   type: string
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Analytics service is running',
    timestamp: new Date().toISOString(),
    databases: {
      postgres: 'connected',
      mongodb: 'connected'
    }
  });
});

router.use('/postgres', postgresRoutes);
router.use('/mongo', mongoRoutes);

export default router;