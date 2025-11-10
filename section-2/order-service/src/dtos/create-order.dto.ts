import Joi from 'joi';

export interface CreateOrderDto {
  userId: number;
  orderItems: {
    productId: number;
    price: number;
    quantity: number;
  }[];
}

export const createOrderSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  orderItems: Joi.array().min(1).items(
    Joi.object({
      productId: Joi.number().integer().positive().required(),
      price: Joi.number().precision(2).positive().required(),
      quantity: Joi.number().integer().positive().required()
    })
  ).required()
});