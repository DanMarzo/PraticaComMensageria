import { ConfigService } from '@nestjs/config';
import { connect, Channel } from 'amqplib';

export const RabbitMQProvider = {
  provide: 'RABBITMQ_PROVIDER',
  useFactory: async (configService: ConfigService) => {
    const uri = configService.get<string>('RABBIT_MQ_CONN');
    const conn = await connect(uri);
    const channel = await conn.createChannel();
    return channel;
  },
  inject: [ConfigService],
};

export type RabbitMQProviderType = Promise<Channel>;
