import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { UpdateNotificationStatusDto } from '../dtos/update-notification-status.dto';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Send a notification' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Notification queued successfully',
  })
  async sendNotification(@Body() createNotificationDto: CreateNotificationDto) {
    const notification = await this.notificationService.sendNotification(
      createNotificationDto,
    );
    return {
      success: true,
      message: 'Notification queued successfully',
      data: notification,
    };
  }

  @Get('user/:userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get notifications for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Notifications retrieved successfully',
  })
  async getUserNotifications(@Param('userId') userId: string) {
    const notifications = await this.notificationService.getNotificationsByUser(
      userId,
    );
    return {
      success: true,
      data: notifications,
    };
  }

  @Get('user/:userId/unread')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get unread notifications for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Unread notifications retrieved successfully',
  })
  async getUnreadNotifications(@Param('userId') userId: string) {
    const notifications = await this.notificationService.getUnreadNotifications(
      userId,
    );
    return {
      success: true,
      data: notifications,
    };
  }

  @Get('user/:userId/unread/count')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get unread notification count for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Unread count retrieved successfully',
  })
  async getUnreadCount(@Param('userId') userId: string) {
    const count = await this.notificationService.getUnreadCount(userId);
    return {
      success: true,
      data: { count },
    };
  }

  @Patch(':id/read')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Notification marked as read',
  })
  async markAsRead(@Param('id') id: string) {
    const notification = await this.notificationService.markAsRead(id);
    return {
      success: true,
      message: 'Notification marked as read',
      data: notification,
    };
  }

  @Patch(':id/unread')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Mark notification as unread' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Notification marked as unread',
  })
  async markAsUnread(@Param('id') id: string) {
    const notification = await this.notificationService.markAsUnread(id);
    return {
      success: true,
      message: 'Notification marked as unread',
      data: notification,
    };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Notification deleted successfully',
  })
  async deleteNotification(@Param('id') id: string) {
    const notification = await this.notificationService.deleteNotification(id);
    return {
      success: true,
      message: 'Notification deleted successfully',
      data: notification,
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service is healthy',
  })
  async health() {
    return {
      success: true,
      message: 'Notification service is healthy',
      timestamp: new Date().toISOString(),
    };
  }
}