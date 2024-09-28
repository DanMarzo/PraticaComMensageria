import { Module } from '@nestjs/common';
import { AuthGuardService } from './auth-guard.service';

@Module({
  providers: [AuthGuardService],
})
export class AuthGuardModule {}
