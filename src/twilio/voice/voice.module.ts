import { Module } from '@nestjs/common';
import { NotificationModule } from '../notifications/notification.module';
import { VoiceController } from './voice.controller';
import { VoiceService } from './voice.service';

@Module({
  imports: [NotificationModule],
  controllers: [VoiceController],
  providers: [
    VoiceService,
  ]
})
export class VoiceModule {}
