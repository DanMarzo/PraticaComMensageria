import { Module } from '@nestjs/common';
import { SalesQueueService } from './sales-queue.service';

@Module({
  providers: [SalesQueueService]
})
export class SalesQueueModule {}
