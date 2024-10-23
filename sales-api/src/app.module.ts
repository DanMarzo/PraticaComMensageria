import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SalesModule } from './modules/sales/sales.module';
import { AuthModule } from './modules/auth/auth.module';
import { MsgConfigModule } from './config/msg-config/msg-config.module';
import { ProductQueueModule } from './config/product-queue/product-queue.module';
import { ProductsService } from './modules/products/products.service';
import { ProductsModule } from './modules/products/products.module';
import { HttpModule } from '@nestjs/axios';
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
    MsgConfigModule,
    ProductQueueModule,
    ProductsModule,
    HttpModule,
    SalesQueueModule,
  ],
  controllers: [],
  providers: [ProductsService],
})
export class AppModule {}
