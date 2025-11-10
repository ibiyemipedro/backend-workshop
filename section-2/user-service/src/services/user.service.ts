import { UserRepository } from '../repositories/user.repository';
import {
  UserCreateInput,
  LoginCredentials,
  UserUpdateInput,
  PasswordUpdate,
  PasswordReset,
  UserRole,
  AuthPayload
} from '../types/user.types';
import {
  hashPassword,
  comparePassword,
  generateToken,
  generateResetCode
} from '../utils/auth.utils';

const resetCodes = new Map<string, { code: string; expires: Date }>();

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(userData: UserCreateInput) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const hashedPassword = await hashPassword(userData.password);
    const userToCreate = {
      ...userData,
      password: hashedPassword,
      role: userData.role || UserRole.USER
    };

    const user = await this.userRepository.create(userToCreate);
    const userResponse = user.toObject();
    delete (userResponse as any).password;

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });

    return { user: userResponse, token };
  }

  async login(credentials: LoginCredentials) {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValidPassword = await comparePassword(credentials.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    const userResponse = user.toObject();
    delete (userResponse as any).password;

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });

    return { user: userResponse, token };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const code = generateResetCode();
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    resetCodes.set(email, { code, expires });

    return { message: 'Password reset code sent', code };
  }

  async resetPassword(resetData: PasswordReset) {
    const storedData = resetCodes.get(resetData.email);
    if (!storedData) {
      throw new Error('Invalid or expired reset code');
    }

    if (storedData.code !== resetData.code || storedData.expires < new Date()) {
      resetCodes.delete(resetData.email);
      throw new Error('Invalid or expired reset code');
    }

    const user = await this.userRepository.findByEmail(resetData.email);
    if (!user) {
      throw new Error('User not found');
    }

    const hashedPassword = await hashPassword(resetData.newPassword);
    await this.userRepository.updatePassword(user._id.toString(), hashedPassword);

    resetCodes.delete(resetData.email);
    return { message: 'Password reset successfully' };
  }

  async updatePassword(userId: string, passwordData: PasswordUpdate) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await comparePassword(passwordData.currentPassword, user.password);
    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    const hashedPassword = await hashPassword(passwordData.newPassword);
    await this.userRepository.updatePassword(userId, hashedPassword);

    return { message: 'Password updated successfully' };
  }

  async updateProfile(userId: string, updateData: UserUpdateInput) {
    const updatedUser = await this.userRepository.update(userId, updateData);
    if (!updatedUser) {
      throw new Error('User not found');
    }

    const userResponse = updatedUser.toObject();
    delete (userResponse as any).password;

    return userResponse;
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const userResponse = user.toObject();
    delete (userResponse as any).password;

    return userResponse;
  }
}