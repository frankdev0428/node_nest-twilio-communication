import { Module } from '@nestjs/common';
// import { NotificationModule } from '../notifications/notification.module';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({
  // imports: [NotificationModule],
  controllers: [StripeController],
  providers: [
    StripeService,
  ]
})
export class StripeModule {}
