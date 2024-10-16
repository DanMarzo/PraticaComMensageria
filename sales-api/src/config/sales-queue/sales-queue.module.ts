import { Module } from '@nestjs/common';
import { SalesQueueService } from './sales-queue.service';
import { MsgConfigModule } from '../msg-config/msg-config.module';

@Module({
  imports: [MsgConfigModule],
  providers: [SalesQueueService],
})
export class SalesQueueModule {}
