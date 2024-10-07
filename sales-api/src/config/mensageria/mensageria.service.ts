import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MensageriaService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('MQ_SALES_CONFIRMATION') private readonly salesMq: ClientProxy,
    @Inject('MQ_PRODUCT_STOCK_UPDATE') private readonly productMq: ClientProxy,
  ) {}

  async sendMessageProductUpdate<T>(data: T) {
    await this.productMq.emit(
      this.configService.get('PRODUCT_STOCK_UPDATE_ROUTING_KEY'),
      data,
    );
  }
  async sendMessageSales<T>(data: T) {
    await this.salesMq.emit(
      this.configService.get('SALES_CONFIRMATION_ROUTING_KEY'),
      data,
    );
  }
}
