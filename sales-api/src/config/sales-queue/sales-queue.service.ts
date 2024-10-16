import { Injectable, OnModuleInit } from '@nestjs/common';
import { MsgConfigService } from '../msg-config/msg-config.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SalesQueueService implements OnModuleInit {
  private productTopic: string;
  private productStockUpdateQueue: string;
  private productStockUpdateRoutingKey: string;
  private salesConfirmationQueue: string;
  private salesConfirmationRoutingKey: string;

  constructor(
    private readonly msgConfigService: MsgConfigService,
    private readonly config: ConfigService,
  ) {}

  private startVariables() {
    this.productTopic = this.config.get('PRODUCT_TOPIC');
    this.productStockUpdateQueue = this.config.get(
      'PRODUCT_STOCK_UPDATE_QUEUE',
    );
    this.productStockUpdateRoutingKey = this.config.get(
      'PRODUCT_STOCK_UPDATE_ROUTING_KEY',
    );
    this.salesConfirmationQueue = this.config.get('SALES_CONFIRMATION_QUEUE');
    this.salesConfirmationRoutingKey = this.config.get(
      'SALES_CONFIRMATION_ROUTING_KEY',
    );
  }

  onModuleInit() {
    console.log('Start sales queue');
  }
}
