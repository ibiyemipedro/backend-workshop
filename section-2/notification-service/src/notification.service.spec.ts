import { Test, TestingModule } from '@nestjs/testing';
import { getQueueToken } from '@nestjs/bull';
import { NotificationService } from '../src/services/notification.service';
import { NotificationRepository } from '../src/repositories/notification.repository';
import { CreateNotificationDto } from '../src/dtos/create-notification.dto';
import { NotificationType } from '../src/types/notification.types';

const mockNotificationRepository = {
  create: jest.fn(),
  findByUserId: jest.fn(),
  findUnreadByUserId: jest.fn(),
  updateReadStatus: jest.fn(),
  delete: jest.fn(),
  countUnreadByUserId: jest.fn(),
};

const mockQueue = {
  add: jest.fn(),
};

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: NotificationRepository,
          useValue: mockNotificationRepository,
        },
        {
          provide: getQueueToken('notification'),
          useValue: mockQueue,
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendNotification', () => {
    it('should create notification and add to queue', async () => {
      const createNotificationDto: CreateNotificationDto = {
        userId: 'user123',
        title: 'Test Notification',
        description: 'Test description',
        notificationType: NotificationType.EMAIL,
      };

      const mockNotification = { id: 'notification123', ...createNotificationDto };
      mockNotificationRepository.create.mockResolvedValue(mockNotification);
      mockQueue.add.mockResolvedValue({});

      const result = await service.sendNotification(createNotificationDto);

      expect(mockNotificationRepository.create).toHaveBeenCalledWith(createNotificationDto);
      expect(mockQueue.add).toHaveBeenCalledWith(
        'process-notification',
        {
          notificationId: mockNotification.id,
          ...createNotificationDto,
        },
        expect.any(Object)
      );
      expect(result).toBe(mockNotification);
    });
  });
});