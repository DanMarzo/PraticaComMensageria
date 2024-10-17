import { Inject, Injectable } from '@nestjs/common';
import { RabbitMQProviderType } from './msg-config.provider';
import { Channel } from 'amqp-connection-manager';
import { Message } from 'amqplib';

@Injectable()
export class MsgConfigService {
  private channel: Channel;
  constructor(
    @Inject('RABBITMQ_PROVIDER')
    private readonly rabbitMqProvider: RabbitMQProviderType,
  ) {}

  private async start() {
    this.channel ??= await this.rabbitMqProvider;
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: object,
  ) {
    await this.start();
    return this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
    );
  }

  async consume(queue: string, callback?: (message: Message) => void) {
    await this.start();
    return this.channel.consume(queue, (message) => {
      if (callback) callback(message);
      this.channel.ack(message);
    });
  }
}
