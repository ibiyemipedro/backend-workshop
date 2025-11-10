import Joi from 'joi';

export interface AddToCartDto {
  userId: number;
  productId: number;
  price: number;
  quantity: number;
}

export interface UpdateCartDto {
  quantity: number;
}

export interface RemoveFromCartDto {
  userId: number;
  productId: number;
}

export const addToCartSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  productId: Joi.number().integer().positive().required(),
  price: Joi.number().precision(2).positive().required(),
  quantity: Joi.number().integer().positive().required()
});

export const updateCartSchema = Joi.object({
  quantity: Joi.number().integer().positive().required()
});

export const removeFromCartSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  productId: Joi.number().integer().positive().required()
});