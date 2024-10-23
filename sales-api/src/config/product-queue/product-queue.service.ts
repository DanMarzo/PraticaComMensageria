import { Injectable, OnModuleInit } from '@nestjs/common';
import { MsgConfigService } from '../msg-config/msg-config.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductQueueService implements OnModuleInit {
  constructor(
    private readonly msgConfigService: MsgConfigService,
    private readonly config: ConfigService,
  ) {}
  onModuleInit() {
    console.log('Product queue');
  }
}
