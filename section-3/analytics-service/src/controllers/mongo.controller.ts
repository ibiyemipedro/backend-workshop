import { Request, Response } from 'express';
import { MongoService } from '../services/mongo.service';
import { successResponse, errorResponse } from '../utils/response.util';

export class MongoController {
  private mongoService: MongoService;

  constructor() {
    this.mongoService = new MongoService();
  }

  getUserCategoryAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.mongoService.getUserCategoryAnalytics();
      res.json(successResponse(data, 'MongoDB user category analytics retrieved successfully'));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json(errorResponse(`Failed to retrieve user category analytics: ${errorMessage}`));
    }
  };

  getProductAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.mongoService.getProductAnalytics();
      res.json(successResponse(data, 'MongoDB product analytics retrieved successfully'));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json(errorResponse(`Failed to retrieve product analytics: ${errorMessage}`));
    }
  };
}