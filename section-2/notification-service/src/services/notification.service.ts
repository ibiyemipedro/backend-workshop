import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { NotificationRepository } from '../repositories/notification.repository';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { NotificationDocument } from '../models/notification.model';
import { NotificationType } from '../types/notification.types';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    @InjectQueue('notification') private notificationQueue: Queue,
  ) { }

  async sendNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationDocument> {
    const notification = await this.notificationRepository.create(
      createNotificationDto,
    );

    await this.notificationQueue.add(
      'process-notification',
      {
        notificationId: notification.id,
        ...createNotificationDto,
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      },
    );

    return notification;
  }

  async getNotificationsByUser(userId: string): Promise<NotificationDocument[]> {
    return this.notificationRepository.findByUserId(userId);
  }

  async getUnreadNotifications(userId: string): Promise<NotificationDocument[]> {
    return this.notificationRepository.findUnreadByUserId(userId);
  }

  async markAsRead(notificationId: string): Promise<NotificationDocument> {
    return this.notificationRepository.updateReadStatus(notificationId, true);
  }

  async markAsUnread(notificationId: string): Promise<NotificationDocument> {
    return this.notificationRepository.updateReadStatus(notificationId, false);
  }

  async deleteNotification(notificationId: string): Promise<NotificationDocument> {
    return this.notificationRepository.delete(notificationId);
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationRepository.countUnreadByUserId(userId);
  }
}