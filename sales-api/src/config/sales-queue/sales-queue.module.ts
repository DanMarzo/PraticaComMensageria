import { Module } from '@nestjs/common';
import { SalesQueueService } from './sales-queue.service';
import { MsgConfigModule } from '../msg-config/msg-config.module';
import { ConfigModule } from '@nestjs/config';
import { SalesModule } from 'src/modules/sales/sales.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/domain/order.entity';

@Module({
  imports: [
    MsgConfigModule,
    ConfigModule,
    SalesModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [SalesQueueService],
})
export class SalesQueueModule {}
