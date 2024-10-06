import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './../../domain/order.entity';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { User } from 'src/domain/user.entity';
import { RabbitmqService } from 'src/confg/rabbitmq/rabbitmq.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly client: RabbitmqService,
  ) {}

  async createSale(createSale: CreateOrderDTO, user: User): Promise<any> {
    const newOrder = Order.generateOrder(createSale, user);
    return await this.orderModel.create(newOrder);
  }
}
