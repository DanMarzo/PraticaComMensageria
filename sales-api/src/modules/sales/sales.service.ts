import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './../../domain/order.entity';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { User } from 'src/domain/user.entity';
import { MsgConfigService } from 'src/config/msg-config/msg-config.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly messageService: MsgConfigService,
    private readonly configService: ConfigService,
  ) {}

  async createSale(createSale: CreateOrderDTO, user: User): Promise<any> {
    const newOrder = Order.generateOrder(createSale, user);
    return await this.orderModel.create(newOrder);
  }

  async testMessage() {
    await this.messageService.publishInExchange(
      this.configService.get('PRODUCT_TOPIC'),
      this.configService.get('PRODUCT_STOCK_UPDATE_ROUTING_KEY'),
      { produto_teste: 'teste' },
    );
  }
}
