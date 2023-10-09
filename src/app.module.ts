import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { AppDataSource } from './data-source';
import { JwtStrategy } from './guard/jwt.strategy';
import { HelpModule } from './help/help.module';
import { ChatModule } from './twilio/chat/chat.module';
import { EmailModule } from './twilio/email/email.module';
import { FacebookModule } from './twilio/facebook/facebook.module';
import { SMSModule } from './twilio/sms/sms.module';
import { VoiceModule } from './twilio/voice/voice.module';
import { WebchatModule } from './twilio/webchat/webchat.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '30d',
        issuer: 'communicate-backend',
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public', 'upload'),
    }),
    forwardRef(() => AuthModule),
    forwardRef(() => EmailModule),
    forwardRef(() => SMSModule),
    forwardRef(() => VoiceModule),
    forwardRef(() => FacebookModule),
    forwardRef(() => ChatModule),
    forwardRef(() => WebchatModule),
    forwardRef(() => CustomerModule),
    forwardRef(() => HelpModule),
    forwardRef(() => StripeModule),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        return AppDataSource.initialize();
      }
    },
    JwtStrategy,
  ],
})
export class AppModule {}
