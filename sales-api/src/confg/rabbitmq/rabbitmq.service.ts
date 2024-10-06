import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
  constructor(@Inject('SALES_MQ') public readonly clientRMQ: ClientRMQ) {}

  async Emitter() {
    await this.clientRMQ.emit('', {});
  }
}
