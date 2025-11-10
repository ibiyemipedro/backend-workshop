import { hashPassword, comparePassword, generateToken, verifyToken, generateResetCode } from '../src/utils/auth.utils';
import { AuthPayload, UserRole } from '../src/types/user.types';

describe('Auth Utils', () => {
  describe('hashPassword and comparePassword', () => {
    it('should hash and verify password correctly', async () => {
      const password = 'testpassword123';
      const hashedPassword = await hashPassword(password);

      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);

      const isValid = await comparePassword(password, hashedPassword);
      expect(isValid).toBe(true);

      const isInvalid = await comparePassword('wrongpassword', hashedPassword);
      expect(isInvalid).toBe(false);
    });
  });

  describe('generateToken and verifyToken', () => {
    it('should generate and verify JWT token correctly', () => {
      const payload: AuthPayload = {
        userId: '507f1f77bcf86cd799439011',
        email: 'test@example.com',
        role: UserRole.USER
      };

      const token = generateToken(payload);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');

      const decoded = verifyToken(token);
      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.email).toBe(payload.email);
      expect(decoded.role).toBe(payload.role);
    });

    it('should throw error for invalid token', () => {
      expect(() => {
        verifyToken('invalid-token');
      }).toThrow();
    });
  });

  describe('generateResetCode', () => {
    it('should generate 6-digit reset code', () => {
      const code = generateResetCode();
      expect(code).toBeDefined();
      expect(code).toHaveLength(6);
      expect(parseInt(code)).toBeGreaterThan(99999);
      expect(parseInt(code)).toBeLessThan(1000000);
    });
  });
});