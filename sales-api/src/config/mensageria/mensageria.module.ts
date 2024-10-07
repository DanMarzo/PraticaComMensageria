import { Module } from '@nestjs/common';
import { MensageriaService } from './mensageria.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [MensageriaService],
  exports: [MensageriaService],
  imports: [
    ConfigModule,
    ClientsModule.register([
      {
        name: 'MQ_SALES_CONFIRMATION',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ_CONN],
          queue: process.env.SALES_CONFIRMATION_QUEUE,
          queueOptions: { durable: true },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'MQ_PRODUCT_STOCK_UPDATE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ_CONN],
          queue: process.env.PRODUCT_STOCK_UPDATE_QUEUE,
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
})
export class MensageriaModule {}
