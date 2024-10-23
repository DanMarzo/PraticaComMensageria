import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      //Em caso de registro assincrono, deve ser usado o INJECT
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get('PRODUCT_API_URL'),
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
