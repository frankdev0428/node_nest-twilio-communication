import { Module } from '@nestjs/common';
import { WebchatService } from './webchat.service';
import { WebchatController } from './webchat.controller';
import { NotificationModule } from '../notifications/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [WebchatController],
  providers: [WebchatService]
})
export class WebchatModule { }
