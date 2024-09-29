import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ isRequired: true, type: Object })
  user: UserEntity;
  @Prop({ isRequired: true, type: Array })
  products: Array<ProductEntity>;
  @Prop({ isRequired: true, type: String })
  status: string;
  @Prop({ isRequired: true, type: Date })
  createAt: Date;
  @Prop({ isRequired: true, type: Date })
  updateAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
