import { Module } from '@nestjs/common';
import { NotificationModule } from '../notifications/notification.module';
import { SMSController } from './sms.controller';
import { SMSService } from './sms.service';

@Module({
  imports: [NotificationModule],
  controllers: [SMSController],
  providers: [
    SMSService,
  ]
})
export class SMSModule {}
