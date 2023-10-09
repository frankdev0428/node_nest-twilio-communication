import { Test, TestingModule } from '@nestjs/testing';
import { WebchatService } from './webchat.service';

describe('WebchatService', () => {
  let service: WebchatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebchatService],
    }).compile();

    service = module.get<WebchatService>(WebchatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
