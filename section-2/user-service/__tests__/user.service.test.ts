import { UserService } from '../src/services/user.service';
import { UserRepository } from '../src/repositories/user.repository';
import { UserRole } from '../src/types/user.types';

jest.mock('../src/repositories/user.repository');

const MockedUserRepository = UserRepository as jest.MockedClass<typeof UserRepository>;

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    MockedUserRepository.mockClear();
    userService = new UserService();
    mockUserRepository = new MockedUserRepository() as jest.Mocked<UserRepository>;
    (userService as any).userRepository = mockUserRepository;
  });

  describe('register', () => {
    const mockUserData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      address: {
        street: '123 Main St',
        city: 'City',
        state: 'State',
        zipCode: '12345',
        country: 'Country'
      },
      mobile: {
        countryCode: '+1',
        number: '1234567890'
      },
      dateOfBirth: new Date('1990-01-01'),
      password: 'password123'
    };

    it('should register user successfully', async () => {
      const mockUser = {
        _id: '507f1f77bcf86cd799439011',
        ...mockUserData,
        role: UserRole.USER,
        toObject: () => ({ ...mockUserData, _id: '507f1f77bcf86cd799439011', role: UserRole.USER })
      };

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(mockUser as any);

      const result = await userService.register(mockUserData);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe(mockUserData.email);
      expect(result.user).not.toHaveProperty('password');
    });

    it('should throw error if user already exists', async () => {
      const existingUser = { email: mockUserData.email };
      mockUserRepository.findByEmail.mockResolvedValue(existingUser as any);

      await expect(userService.register(mockUserData)).rejects.toThrow('User already exists with this email');
    });
  });

  describe('login', () => {
    const mockCredentials = {
      email: 'john.doe@example.com',
      password: 'password123'
    };

    it('should login successfully with valid credentials', async () => {
      const mockUser = {
        _id: '507f1f77bcf86cd799439011',
        email: mockCredentials.email,
        password: '$2b$12$hashedpassword', // This would be a real bcrypt hash
        role: UserRole.USER,
        toObject: () => ({ email: mockCredentials.email, _id: '507f1f77bcf86cd799439011', role: UserRole.USER })
      };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser as any);

      // Mock bcrypt.compare to return true
      jest.doMock('bcryptjs', () => ({
        compare: jest.fn().mockResolvedValue(true)
      }));

      const result = await userService.login(mockCredentials);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe(mockCredentials.email);
    });

    it('should throw error for invalid email', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(userService.login(mockCredentials)).rejects.toThrow('Invalid email or password');
    });
  });

  describe('getProfile', () => {
    it('should return user profile successfully', async () => {
      const mockUser = {
        _id: '507f1f77bcf86cd799439011',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.USER,
        toObject: () => ({ email: 'john.doe@example.com', firstName: 'John', lastName: 'Doe' })
      };

      mockUserRepository.findById.mockResolvedValue(mockUser as any);

      const result = await userService.getProfile('507f1f77bcf86cd799439011');

      expect(result).toBeDefined();
      expect(result.email).toBe(mockUser.email);
      expect(result.firstName).toBe(mockUser.firstName);
      expect(result).not.toHaveProperty('password');
    });

    it('should throw error if user not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(userService.getProfile('nonexistent')).rejects.toThrow('User not found');
    });
  });
});