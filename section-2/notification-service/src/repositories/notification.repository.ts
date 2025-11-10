import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from '../models/notification.model';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { NotificationType } from '../types/notification.types';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) { }

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationDocument> {
    const notification = new this.notificationModel(createNotificationDto);
    return notification.save();
  }

  async findByUserId(userId: string): Promise<NotificationDocument[]> {
    return this.notificationModel.find({ userId }).exec();
  }

  async findById(id: string): Promise<NotificationDocument> {
    return this.notificationModel.findById(id).exec();
  }

  async updateReadStatus(id: string, isRead: boolean): Promise<NotificationDocument> {
    return this.notificationModel
      .findByIdAndUpdate(id, { isRead, updatedAt: new Date() }, { new: true })
      .exec();
  }

  async delete(id: string): Promise<NotificationDocument> {
    return this.notificationModel.findByIdAndDelete(id).exec();
  }

  async findUnreadByUserId(userId: string): Promise<NotificationDocument[]> {
    return this.notificationModel.find({ userId, isRead: false }).exec();
  }

  async countUnreadByUserId(userId: string): Promise<number> {
    return this.notificationModel.countDocuments({ userId, isRead: false }).exec();
  }
}