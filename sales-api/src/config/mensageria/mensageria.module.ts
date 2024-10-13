import { Module } from '@nestjs/common';
import { MensageriaService } from './mensageria.service';
import { Mensageria } from './mensageria';

@Module({
  providers: [MensageriaService, Mensageria],
})
export class MensageriaModule {}
