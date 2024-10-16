import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SalesModule } from './modules/sales/sales.module';
import { AuthModule } from './modules/auth/auth.module';
import { MsgConfigModule } from './config/msg-config/msg-config.module';
import { SalesQueueModule } from './config/sales-queue/sales-queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('CONNECT_MONGO'),
      }),
    }),
    SalesModule,
    AuthModule,
    ConfigModule,
    SalesQueueModule,
    MsgConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
