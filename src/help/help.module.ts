import { Module } from '@nestjs/common';
import { HelpController } from './help.controller';
import { HelpService } from './help.service';

@Module({
  controllers: [HelpController],
  providers: [HelpService]
})
export class HelpModule {}
