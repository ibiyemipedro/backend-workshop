import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '../types/notification.types';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'ID of the user to receive the notification',
    example: '64b5f8c8e9d8a1b2c3d4e5f6'
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Title of the notification',
    example: 'Order Confirmation'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of the notification',
    example: 'Your order #12345 has been confirmed'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Type of notification',
    enum: NotificationType,
    example: NotificationType.EMAIL
  })
  @IsEnum(NotificationType)
  notificationType: NotificationType;
}