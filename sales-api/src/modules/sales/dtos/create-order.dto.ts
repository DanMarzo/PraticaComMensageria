import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/domain/product.entity';

export class CreateOrderDTO {
  @ApiProperty({ isArray: true, type: Product })
  products: Product[];
  @ApiProperty()
  status: string;
}
