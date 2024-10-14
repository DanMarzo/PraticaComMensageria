import { Module } from '@nestjs/common';
import { MensageriaService } from './mensageria.service';
import { RabbitMQProvider } from './mensageria.provider';

@Module({
  providers: [MensageriaService, RabbitMQProvider],
  exports: [RabbitMQProvider],
})
export class MensageriaModule {}
