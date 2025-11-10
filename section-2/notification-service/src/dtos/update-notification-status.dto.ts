import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotificationStatusDto {
  @ApiProperty({
    description: 'Read status of the notification',
    example: true
  })
  @IsBoolean()
  isRead: boolean;
}