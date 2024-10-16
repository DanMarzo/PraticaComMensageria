import { ConfigService } from '@nestjs/config';
import { connect, Channel } from 'amqplib';

export const RabbitMQProvider = {
  provide: 'RABBITMQ_PROVIDER',
  useFactory: async (configService: ConfigService) => {
    const productTopic = configService.get('PRODUCT_TOPIC');
    const productStockUpdateQueue = configService.get(
      'PRODUCT_STOCK_UPDATE_QUEUE',
    );
    const productStockUpdateRoutingKey = configService.get(
      'PRODUCT_STOCK_UPDATE_ROUTING_KEY',
    );
    const salesConfirmationQueue = configService.get(
      'SALES_CONFIRMATION_QUEUE',
    );
    const salesConfirmationRoutingKey = configService.get(
      'SALES_CONFIRMATION_ROUTING_KEY',
    );
    const uri = configService.get<string>('RABBIT_MQ_CONN');
    const conn = await connect(uri);
    const channel = await conn.createChannel();
    await createQueue(
      channel,
      productStockUpdateQueue,
      productStockUpdateRoutingKey,
      productTopic,
    );
    await createQueue(
      channel,
      salesConfirmationQueue,
      salesConfirmationRoutingKey,
      productTopic,
    );
    return channel;
  },
  inject: [ConfigService],
};

const createQueue = async (
  channel: Channel,
  queue: string,
  routingKey: string,
  topic: string,
): Promise<void> => {
  await channel.assertExchange(topic, 'topic', { durable: true });
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, topic, routingKey);
};
export type RabbitMQProviderType = Promise<Channel>;
