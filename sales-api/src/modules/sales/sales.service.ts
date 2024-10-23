import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './../../domain/order.entity';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { MsgConfigService } from 'src/config/msg-config/msg-config.service';
import { ConfigService } from '@nestjs/config';
import { OrderStatusEnum } from 'src/domain/order-status.enum';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ProductsService } from '../products/products.service';

@Injectable()
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
    const model = await this.orderModel.create(newOrder);
    await this.sendMessage(createSale, model.id);
    return model;
  }

  async sendMessage(newSale: CreateOrderDTO, id: string) {
    const produtTopic = this.configService.get('PRODUCT_TOPIC');
    const updateStockUpdateRoutingKey = this.configService.get(
      'PRODUCT_STOCK_UPDATE_ROUTING_KEY',
    );
    const novaVenda = {
      salesId: id,
      products: newSale.products,
    };
    await this.messageService.publishInExchange(
      produtTopic,
      updateStockUpdateRoutingKey,
      novaVenda,
    );
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
