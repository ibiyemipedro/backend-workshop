import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { NotificationController } from './controllers/notification.controller';
import { NotificationService } from './services/notification.service';
import { NotificationProcessor } from './services/notification.processor';
import { NotificationRepository } from './repositories/notification.repository';
import { Notification, NotificationSchema } from './models/notification.model';
import { JwtStrategy } from './utils/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL || 'mongodb://admin:password123@localhost:27021/notification_db?authSource=admin',
    ),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6380,
      },
    }),
    BullModule.registerQueue({
      name: 'notification',
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationProcessor,
    NotificationRepository,
    JwtStrategy,
  ],
})
export class AppModule { }