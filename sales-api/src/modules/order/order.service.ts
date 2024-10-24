import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from 'src/domain/order.entity';
import { Model } from 'mongoose';
import { MsgConfigService } from 'src/config/msg-config/msg-config.service';
import { ConfigService } from '@nestjs/config';
import { ProductsService } from '../products/products.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { User } from 'src/domain/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly messageService: MsgConfigService,
    private readonly configService: ConfigService,
    private readonly productService: ProductsService,
  ) {}
  async createSale(createSale: CreateOrderDTO): Promise<any> {
    const userInfo = this.getUserHeader();
    await this.validateProductStock(createSale);
    const newOrder = Order.generateOrder(createSale, userInfo);
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
    const userInfo = this.getUserHeader();
    return await this.orderModel.find({
      'user.id': userInfo.id,
    });
  }

  async findByProductId(id: string) {
    const userInfo = this.getUserHeader();
    const consulta = {
      'products.productId': Number.parseInt(id),
      'user.id': userInfo.id,
    };
    const resultSearch = await this.orderModel.find(consulta);
    const result = resultSearch.map((item) => item._id);
    return { sales: result };
  }
  private getUserHeader(): User {
    const res = this.request as any;
    const user = res.userInfo;
    if (!user) {
      throw new UnauthorizedException('Não foi possível recuperar token');
    }
    return user;
  }
}
