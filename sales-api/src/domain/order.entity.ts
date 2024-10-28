import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.entity';
import { Product } from './product.entity';
import { CreateOrderDTO } from 'src/modules/order/dtos/create-order.dto';
import { OrderStatusEnum } from './order-status.enum';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  static generateOrder(
    createOrderDTO: CreateOrderDTO,
    user: User,
    transactionid: string,
    serviceid: string,
  ): Order {
    const order = new Order();
    order.user = user;
    order.createAt = new Date();
    order.updateAt = new Date();
    order.products = createOrderDTO.products;
    order.status = OrderStatusEnum.PENDING;
    order.serviceid = serviceid;
    order.transactionid = transactionid;
    return order;
  }
  @Prop({ isRequired: true, type: Object })
  user: User;
  @Prop({ isRequired: true, type: Array })
  products: Array<Product>;
  @Prop({ isRequired: true, type: String })
  status: OrderStatusEnum;
  @Prop({ isRequired: true, type: Date })
  createAt: Date;
  @Prop({ isRequired: true, type: Date })
  updateAt: Date;

  @Prop({ isRequired: true, type: String })
  transactionid: string;
  @Prop({ isRequired: true, type: String })
  serviceid: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
