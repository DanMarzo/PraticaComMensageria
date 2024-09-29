import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty()
  id: number;
  @ApiProperty()
  quantity: number;
}
