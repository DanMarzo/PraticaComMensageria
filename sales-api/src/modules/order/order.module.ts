import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MsgConfigModule } from 'src/config/msg-config/msg-config.module';
import { ProductsModule } from '../products/products.module';
import { Order, OrderSchema } from 'src/domain/order.entity';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MsgConfigModule,
    ProductsModule,
  ],
})
export class OrderModule {}
