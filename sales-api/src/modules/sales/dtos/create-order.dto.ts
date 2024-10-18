import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusEnum } from 'src/domain/order-status.enum';
import { Product } from 'src/domain/product.entity';

export class CreateOrderDTO {
  @ApiProperty({ isArray: true, type: Product })
  products: Product[];
  @ApiProperty()
  status: OrderStatusEnum;
}
