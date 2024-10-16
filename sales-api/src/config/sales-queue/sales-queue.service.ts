import { Injectable, OnModuleInit } from '@nestjs/common';
import { MsgConfigService } from '../msg-config/msg-config.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SalesQueueService implements OnModuleInit {
  private salesConfirmationQueue: string;
  private salesConfirmationRoutingKey: string;

  constructor(
    private readonly msgConfigService: MsgConfigService,
    private readonly config: ConfigService,
  ) {}

  private startVariables() {
    this.salesConfirmationQueue = this.config.get('SALES_CONFIRMATION_QUEUE');
    this.salesConfirmationRoutingKey = this.config.get(
      'SALES_CONFIRMATION_ROUTING_KEY',
    );
  }
  exibir(params: string) {
    console.log(params);
  }
  async onModuleInit() {
    if (!this.salesConfirmationQueue) this.startVariables();
    await this.msgConfigService.consume(
      this.salesConfirmationQueue,
      (mensagem) => {
        this.exibir(mensagem.content.toString());
      },
    );
  }
}
