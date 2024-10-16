import { Module } from '@nestjs/common';
import { MsgConfigService } from './msg-config.service';
import { RabbitMQProvider } from './msg-config.provider';

@Module({
  providers: [MsgConfigService, RabbitMQProvider],
  exports: [MsgConfigService, RabbitMQProvider],
})
export class MsgConfigModule {}
