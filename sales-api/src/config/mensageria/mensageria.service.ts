import { Inject, Injectable } from '@nestjs/common';
import { RabbitMQProviderType } from './mensageria.provider';
import { Channel, Message } from 'amqplib';

@Injectable()
export class MensageriaService {
  private channel: Channel;
  constructor(
    @Inject('RABBITMQ_PROVIDER')
    private readonly rabbitMqProvider: RabbitMQProviderType,
  ) {}

  async start() {
    this.channel ??= await this.rabbitMqProvider;
  }

  async publishInQueue(queue: string, message: string) {
    await this.start();
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
  ) {
    return this.channel.publish(exchange, routingKey, Buffer.from(message));
  }

  async consume(queue: string, callback?: (message: Message) => void) {
    return this.channel.consume(queue, (message) => {
      if (callback) callback(message);
      this.channel.ack(message);
    });
  }
}
