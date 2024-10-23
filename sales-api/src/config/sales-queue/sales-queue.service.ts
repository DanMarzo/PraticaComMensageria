import { Injectable, OnModuleInit } from '@nestjs/common';
import { MsgConfigService } from '../msg-config/msg-config.service';
import { ConfigService } from '@nestjs/config';
import { SalesService } from 'src/modules/sales/sales.service';

@Injectable()
export class SalesQueueService implements OnModuleInit {
  private salesConfirmationQueue: string;
  private salesConfirmationRoutingKey: string;

  constructor(
    private readonly msgConfigService: MsgConfigService,
    private readonly config: ConfigService,
    private readonly salesService: SalesService,
  ) {}

  private startVariables() {
    console.log('->');

    this.salesConfirmationQueue = this.config.get('SALES_CONFIRMATION_QUEUE');
    this.salesConfirmationRoutingKey = this.config.get(
      'SALES_CONFIRMATION_ROUTING_KEY',
    );
  }

  async onModuleInit() {
    console.log('---------');

    if (!this.salesConfirmationQueue) this.startVariables();
    await this.msgConfigService.consume(
      this.salesConfirmationQueue,
      async (mensagem) => {
        console.log(mensagem.content.toString());

        // await this.salesService.updateStatus(
        //   JSON.parse(mensagem.content.toString()),
        // );
      },
    );
  }
}
