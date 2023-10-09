import { Module } from '@nestjs/common';
import { NotificationModule } from '../notifications/notification.module';
import { FacebookController } from './facebook.controller';
import { FacebookService } from './facebook.service';

@Module({
  imports: [NotificationModule],
  controllers: [FacebookController],
  providers: [
    FacebookService,
  ]
})
export class FacebookModule {}
