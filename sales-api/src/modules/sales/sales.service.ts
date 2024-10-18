import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './../../domain/order.entity';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { User } from 'src/domain/user.entity';
import { MsgConfigService } from 'src/config/msg-config/msg-config.service';
import { ConfigService } from '@nestjs/config';
import { OrderStatusEnum } from 'src/domain/order-status.enum';
import { SalesConfirmationDTO } from './dtos/sales-confirmation.dto';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class SalesService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly messageService: MsgConfigService,
    private readonly configService: ConfigService,
  ) {}

  async createSale(createSale: CreateOrderDTO, user: User): Promise<any> {
    const token = this.request.headers.get('Authorization');
    console.log(token);
    createSale.status = OrderStatusEnum.PENDING;
    const newOrder = Order.generateOrder(createSale, user);
    return await this.orderModel.create(newOrder);
  }

  async updateStatus(salesConfirmartion: SalesConfirmationDTO) {
    const order = await this.orderModel.findById(salesConfirmartion.salesId);
    if (order.status && order.status != salesConfirmartion.status) {
      order.status = salesConfirmartion.status;
      await this.orderModel.updateOne(
        { id: order.id },
        { status: salesConfirmartion.status },
      );
    }
  }

  async findById(id: string) {
    return await this.orderModel.findById(id);
  }

  async findAll() {
    return await this.orderModel.find();
  }
}
