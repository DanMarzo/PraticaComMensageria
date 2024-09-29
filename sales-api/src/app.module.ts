import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SalesService } from './modules/sales/sales.service';
import { SalesModule } from './modules/sales/sales.module';
import { AuthModule } from './modules/auth/auth.module';

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

    SalesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [SalesService],
})
export class AppModule {}
