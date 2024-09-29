import { Product } from 'src/domain/product.entity';

export class CreateOrderDTO {
  products: Array<Product>;
  status: string;
}
