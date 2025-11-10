import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validateRequest } from '../validation/validation.middleware';
import { authenticateToken } from '../utils/auth.middleware';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updatePasswordSchema,
  updateProfileSchema
} from '../validation/user.validation';

const router = Router();

router.post('/register', validateRequest(registerSchema), userController.register);
router.post('/login', validateRequest(loginSchema), userController.login);
router.post('/forgot-password', validateRequest(forgotPasswordSchema), userController.forgotPassword);
router.post('/reset-password', validateRequest(resetPasswordSchema), userController.resetPassword);

router.use(authenticateToken);

router.put('/password', validateRequest(updatePasswordSchema), userController.updatePassword);
router.put('/profile', validateRequest(updateProfileSchema), userController.updateProfile);
router.get('/profile', userController.getProfile);

export default router;