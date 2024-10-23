import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
