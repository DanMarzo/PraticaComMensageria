import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/domain/order.entity';
import { AuthModule } from '../auth/auth.module';
import { RabbitmqModule } from 'src/confg/rabbitmq/rabbitmq.module';

@Module({
  controllers: [SalesController],
  imports: [
    RabbitmqModule,
    AuthModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [SalesService],
})
export class SalesModule {}
