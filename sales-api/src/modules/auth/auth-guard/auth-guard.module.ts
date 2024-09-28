import { Module } from '@nestjs/common';
import { AuthGuardService } from './auth-guard.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthGuardService],
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.SECRET_KEY,
      }),
    }),
  ],
  exports: [AuthGuardService],
})
export class AuthGuardModule {}
