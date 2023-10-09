import { Module } from '@nestjs/common';
import { NotificationModule } from '../notifications/notification.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [NotificationModule],
  controllers: [ChatController],
  providers: [
    ChatService,
  ]
})
export class ChatModule {}
