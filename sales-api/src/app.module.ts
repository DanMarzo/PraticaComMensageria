import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuardService } from './modules/auth/auth-guard/auth-guard.service';
import { AuthService } from './modules/auth/auth.service';
import { SalesService } from './modules/sales/sales.service';
import { SalesModule } from './modules/sales/sales.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuardModule } from './modules/auth/auth-guard/auth-guard.module';
import { SalesModule } from './modules/sales/sales.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('CONNECT_MONGO'), // Pega a variável do .env
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('SECRET_KEY'), // Pega a variável do .env
      }),
    }),
    SalesModule,
    AuthGuardModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AuthGuardService, AuthService, SalesService],
})
export class AppModule {}
