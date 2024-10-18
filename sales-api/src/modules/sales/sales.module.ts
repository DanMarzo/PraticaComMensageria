import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/domain/order.entity';
import { AuthModule } from '../auth/auth.module';
import { MsgConfigModule } from 'src/config/msg-config/msg-config.module';

@Module({
  controllers: [SalesController],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MsgConfigModule,
  ],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}
