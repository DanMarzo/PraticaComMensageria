import { Module } from '@nestjs/common';
import { SalesQueueService } from './sales-queue.service';
import { MsgConfigModule } from '../msg-config/msg-config.module';
import { SalesModule } from 'src/modules/sales/sales.module';

@Module({
  imports: [MsgConfigModule, SalesModule],
  providers: [SalesQueueService],
})
export class SalesQueueModule {}
