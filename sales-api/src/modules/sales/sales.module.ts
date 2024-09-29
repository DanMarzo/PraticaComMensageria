import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [SalesController],
  imports: [AuthModule, AuthModule],
  providers: [SalesService],
})
export class SalesModule {}
