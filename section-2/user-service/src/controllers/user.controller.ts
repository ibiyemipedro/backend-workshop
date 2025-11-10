import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { formatResponse } from '../utils/response.utils';
import { AuthenticatedRequest } from '../utils/auth.middleware';

const userService = new UserService();

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json(formatResponse(true, result, 'User registered successfully'));
  } catch (error) {
    res.status(400).json(formatResponse(false, null, undefined, (error as Error).message));
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json(formatResponse(true, result, 'Login successful'));
  } catch (error) {
    res.status(400).json(formatResponse(false, null, undefined, (error as Error).message));
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userService.forgotPassword(req.body.email);
    res.status(200).json(formatResponse(true, result));
  } catch (error) {
    res.status(400).json(formatResponse(false, null, undefined, (error as Error).message));
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userService.resetPassword(req.body);
    res.status(200).json(formatResponse(true, result));
  } catch (error) {
    res.status(400).json(formatResponse(false, null, undefined, (error as Error).message));
  }
};

export const updatePassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(formatResponse(false, null, undefined, 'Unauthorized'));
      return;
    }

    const result = await userService.updatePassword(userId, req.body);
    res.status(200).json(formatResponse(true, result));
  } catch (error) {
    res.status(400).json(formatResponse(false, null, undefined, (error as Error).message));
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(formatResponse(false, null, undefined, 'Unauthorized'));
      return;
    }

    const result = await userService.updateProfile(userId, req.body);
    res.status(200).json(formatResponse(true, result, 'Profile updated successfully'));
  } catch (error) {
    res.status(400).json(formatResponse(false, null, undefined, (error as Error).message));
  }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(formatResponse(false, null, undefined, 'Unauthorized'));
      return;
    }

    const result = await userService.getProfile(userId);
    res.status(200).json(formatResponse(true, result));
  } catch (error) {
    res.status(404).json(formatResponse(false, null, undefined, (error as Error).message));
  }
};