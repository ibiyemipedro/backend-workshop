import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { formatResponse } from '../utils/response.utils';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json(
        formatResponse(false, null, undefined, error.details[0]?.message || 'Validation error')
      );
      return;
    }

    next();
  };
};