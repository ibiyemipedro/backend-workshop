import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotificationRepository } from '../src/repositories/notification.repository';
import { Notification } from '../src/models/notification.model';
import { CreateNotificationDto } from '../src/dtos/create-notification.dto';
import { NotificationType } from '../src/types/notification.types';

const mockNotificationModel = {
  new: jest.fn(),
  constructor: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  countDocuments: jest.fn(),
  save: jest.fn(),
  exec: jest.fn(),
};

describe('NotificationRepository', () => {
  let repository: NotificationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationRepository,
        {
          provide: getModelToken(Notification.name),
          useValue: mockNotificationModel,
        },
      ],
    }).compile();

    repository = module.get<NotificationRepository>(NotificationRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a notification', async () => {
      const createNotificationDto: CreateNotificationDto = {
        userId: 'user123',
        title: 'Test Notification',
        description: 'Test description',
        notificationType: NotificationType.EMAIL,
      };

      const mockSave = jest.fn().mockResolvedValue(createNotificationDto);

      // Mock the constructor function to return an object with save method
      mockNotificationModel.constructor = jest.fn(() => ({
        save: mockSave,
      }));

      // Setup the test to use the mocked constructor
      (repository as any).notificationModel = mockNotificationModel.constructor;

      await repository.create(createNotificationDto);

      expect(mockNotificationModel.constructor).toHaveBeenCalledWith(createNotificationDto);
      expect(mockSave).toHaveBeenCalled();
    });
  });

  describe('findByUserId', () => {
    it('should find notifications by user ID', async () => {
      const userId = 'user123';
      const mockExec = jest.fn().mockResolvedValue([]);
      mockNotificationModel.find.mockReturnValue({ exec: mockExec });

      const result = await repository.findByUserId(userId);

      expect(mockNotificationModel.find).toHaveBeenCalledWith({ userId });
      expect(mockExec).toHaveBeenCalled();
    });
  });
});