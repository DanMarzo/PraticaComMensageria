import { Test, TestingModule } from '@nestjs/testing';
import { SalesQueueService } from './sales-queue.service';

describe('SalesQueueService', () => {
  let service: SalesQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesQueueService],
    }).compile();

    service = module.get<SalesQueueService>(SalesQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
