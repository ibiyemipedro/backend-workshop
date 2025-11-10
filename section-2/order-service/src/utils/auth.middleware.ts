import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { responseUtils } from './response.utils';

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json(responseUtils.error('Access token is required'));
      return;
    }

    const token = authHeader.substring(7);
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json(responseUtils.error('Invalid or expired token'));
  }
};