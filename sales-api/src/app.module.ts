import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SalesModule } from './modules/sales/sales.module';
import { AuthModule } from './modules/auth/auth.module';
import { MsgConfigModule } from './config/msg-config/msg-config.module';
import { SalesQueueModule } from './config/sales-queue/sales-queue.module';
import { ProductQueueModule } from './config/product-queue/product-queue.module';
import { ProductsService } from './modules/products/products.service';
import { ProductsModule } from './modules/products/products.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    // HttpModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     baseURL: configService.get('PRODUCT_API_URL'),
    //     timeout: 5000,
    //     maxRedirects: 5,
    //   }),
    // }),
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
    ProductQueueModule,
    ProductsModule,
    HttpModule,
  ],
  controllers: [],
  providers: [ProductsService],
})
export class AppModule {}
