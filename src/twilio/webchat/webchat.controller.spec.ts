import { Test, TestingModule } from '@nestjs/testing';
import { WebchatController } from './webchat.controller';
import { WebchatService } from './webchat.service';

describe('WebchatController', () => {
  let controller: WebchatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebchatController],
      providers: [WebchatService],
    }).compile();

    controller = module.get<WebchatController>(WebchatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
