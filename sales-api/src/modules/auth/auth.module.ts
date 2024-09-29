import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.SECRET_KEY,
      }),
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
