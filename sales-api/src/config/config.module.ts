import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [ConfigController],
  providers: [ConfigService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'sales_mq',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: any) => {
          return {
            transport: Transport.RMQ,
            options: {
              urls: configService.get('RABBIT_MQ_CONN'),
              queue: 'sales',
              queueOptions: { durable: true },
            },
          };
        },
      },
    ]),
  ],
})
export class ConfigModule {}
