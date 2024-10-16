import { Injectable } from '@nestjs/common';
import { MsgConfigService } from '../msg-config/msg-config.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductQueueService {
  constructor(
    private readonly msgConfigService: MsgConfigService,
    private readonly config: ConfigService,
  ) {}
  sendProduct() {}
}
