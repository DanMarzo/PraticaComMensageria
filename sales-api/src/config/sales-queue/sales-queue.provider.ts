import { ConfigService } from '@nestjs/config';
import { Channel, connect } from 'amqplib';

export const RabbitMQSalesProvider = {
  provide: 'RABBIT_SALES_',
  useFactory: async (configService: ConfigService) => {
    const uri = configService.get<string>('RABBIT_MQ_CONN');
    const conn = await connect(uri);
    const channel = await conn.createChannel();
    return channel;
  },
  inject: [ConfigService],
};

export type RabbitMQSalesProviderType = Promise<Channel>;
