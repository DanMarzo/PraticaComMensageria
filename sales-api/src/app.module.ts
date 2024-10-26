import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { MsgConfigModule } from './config/msg-config/msg-config.module';
import { ProductQueueModule } from './config/product-queue/product-queue.module';
import { ProductsService } from './modules/products/products.service';
import { ProductsModule } from './modules/products/products.module';
import { HttpModule } from '@nestjs/axios';
import { SalesQueueModule } from './config/sales-queue/sales-queue.module';
import { OrderModule } from './modules/order/order.module';
import { TracingMiddleware } from './config/tracing/tracing.middleware';

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
    AuthModule,
    ConfigModule,
    MsgConfigModule,
    ProductQueueModule,
    ProductsModule,
    HttpModule,
    SalesQueueModule,
    OrderModule,
  ],
  controllers: [],
  providers: [ProductsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TracingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
