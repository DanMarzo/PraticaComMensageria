import { Module } from '@nestjs/common';
import { ProductQueueService } from './product-queue.service';
import { MsgConfigModule } from '../msg-config/msg-config.module';

@Module({
  providers: [ProductQueueService],
  imports: [MsgConfigModule],
})
export class ProductQueueModule {}
