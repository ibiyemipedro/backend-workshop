import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { NotificationPayload, NotificationType } from '../types/notification.types';

@Processor('notification')
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name);

  @Process('process-notification')
  async processNotification(job: Job<NotificationPayload & { notificationId: string }>) {
    const { notificationId, notificationType, title, description, userId } = job.data;

    this.logger.log(`Processing notification ${notificationId} for user ${userId}`);

    try {
      switch (notificationType) {
        case NotificationType.EMAIL:
          await this.sendEmail(job.data);
          break;
        case NotificationType.TEXT:
          await this.sendSms(job.data);
          break;
        case NotificationType.IN_APP:
          await this.processInAppNotification(job.data);
          break;
        default:
          this.logger.warn(`Unknown notification type: ${notificationType}`);
      }

      this.logger.log(`Successfully processed notification ${notificationId}`);
    } catch (error) {
      this.logger.error(`Failed to process notification ${notificationId}:`, error);
      throw error;
    }
  }

  private async sendEmail(data: NotificationPayload & { notificationId: string }) {
    this.logger.log(`Sending email: ${data.title} to user ${data.userId}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  private async sendSms(data: NotificationPayload & { notificationId: string }) {
    this.logger.log(`Sending SMS: ${data.title} to user ${data.userId}`);
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  private async processInAppNotification(data: NotificationPayload & { notificationId: string }) {
    this.logger.log(`Processing in-app notification: ${data.title} for user ${data.userId}`);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}