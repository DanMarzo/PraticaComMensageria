import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.entity';
import { Product } from './product.entity';
import { CreateOrderDTO } from 'src/modules/sales/dtos/create-order.dto';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  // constructor();
  // constructor(createOrderDTO: CreateOrderDTO);
  // constructor(createOrderDTO?: CreateOrderDTO) {
  //   if (createOrderDTO) {
  //     this.createAt = new Date();
  //     this.updateAt = new Date();
  //     this.status = createOrderDTO.status;
  //     this.products = createOrderDTO.products;
  //     this.user = createOrderDTO.user;
  //   }
  // }
  static generateOrder(createOrderDTO: CreateOrderDTO, user: User): Order {
    const order = new Order();
    order.user = user;
    order.createAt = new Date();
    order.updateAt = new Date();
    order.products = createOrderDTO.products;
    order.status = createOrderDTO.status;
    return order;
  }
  @Prop({ isRequired: true, type: Object })
  user: User;
  @Prop({ isRequired: true, type: Array })
  products: Array<Product>;
  @Prop({ isRequired: true, type: String })
  status: string;
  @Prop({ isRequired: true, type: Date })
  createAt: Date;
  @Prop({ isRequired: true, type: Date })
  updateAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
