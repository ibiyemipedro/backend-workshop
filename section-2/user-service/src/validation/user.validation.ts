import Joi from 'joi';

const addressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string().required(),
  country: Joi.string().required(),
  isPreferred: Joi.boolean().optional()
});

const mobileSchema = Joi.object({
  countryCode: Joi.string().required(),
  number: Joi.string().required()
});

export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  address: addressSchema.required(),
  mobile: mobileSchema.required(),
  dateOfBirth: Joi.date().required(),
  password: Joi.string().min(6).max(100).required(),
  addresses: Joi.array().items(addressSchema).optional(),
  role: Joi.string().valid('user', 'admin').optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().length(6).required(),
  newPassword: Joi.string().min(6).max(100).required()
});

export const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).max(100).required()
});

export const updateProfileSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
  address: addressSchema.optional(),
  mobile: mobileSchema.optional(),
  dateOfBirth: Joi.date().optional(),
  addresses: Joi.array().items(addressSchema).optional()
});