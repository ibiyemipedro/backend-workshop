import { Request, Response } from 'express';
import { PostgresService } from '../services/postgres.service';
import { successResponse, errorResponse } from '../utils/response.util';

export class PostgresController {
  private postgresService: PostgresService;

  constructor() {
    this.postgresService = new PostgresService();
  }

  getUserData = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.postgresService.getUserData();
      res.json(successResponse(data, 'PostgreSQL user data retrieved successfully'));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json(errorResponse(`Failed to retrieve user data: ${errorMessage}`));
    }
  };

  getOrderAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.postgresService.getOrderAnalytics();
      res.json(successResponse(data, 'PostgreSQL order analytics retrieved successfully'));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json(errorResponse(`Failed to retrieve order analytics: ${errorMessage}`));
    }
  };
}