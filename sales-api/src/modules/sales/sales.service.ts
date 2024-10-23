import {
  BadRequestException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './../../domain/order.entity';
import { CreateOrderDTO } from './dtos/create-order.dto';
// import { User } from 'src/domain/user.entity';
import { MsgConfigService } from 'src/config/msg-config/msg-config.service';
import { ConfigService } from '@nestjs/config';
import { OrderStatusEnum } from 'src/domain/order-status.enum';
import { SalesConfirmationDTO } from './dtos/sales-confirmation.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ProductsService } from '../products/products.service';

@Injectable({ scope: Scope.REQUEST })
export class SalesService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly messageService: MsgConfigService,
    private readonly configService: ConfigService,
    private readonly productService: ProductsService,
  ) {}

  async createSale(createSale: CreateOrderDTO): Promise<any> {
    const res = this.request as any;
    await this.validateProductStock(createSale);
    createSale.status = OrderStatusEnum.PENDING;
    const newOrder = Order.generateOrder(createSale, res.userInfo);
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

  private async validateProductStock(
    createSale: CreateOrderDTO,
  ): Promise<void> {
    const bearer = this.request.headers['authorization'];
    if (!bearer) {
      throw new UnauthorizedException('Token nao informado.');
    }
    const stockIsOut = await this.productService.checkProductStock(
      bearer,
      createSale.products,
    );
    if (!stockIsOut) {
      throw new BadRequestException('Estoque esgotado!');
    }
  }

  async findById(id: string) {
    return await this.orderModel.findById(id);
  }

  async findAll() {
    return await this.orderModel.find();
  }
}
