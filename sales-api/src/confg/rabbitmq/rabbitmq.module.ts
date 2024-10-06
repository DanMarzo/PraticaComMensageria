import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [RabbitmqService],
  exports: [RabbitmqService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'SALES_MQ',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: any) => {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [configService.get('RABBIT_MQ_CONN')],
              //queue: 'sales',
              queueOptions: { durable: true },
            },
          };
        },
      },
    ]),
  ],
})
export class RabbitmqModule {}
