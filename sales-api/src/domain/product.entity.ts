import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty()
  productId: number;
  @ApiProperty()
  quantity: number;
}
