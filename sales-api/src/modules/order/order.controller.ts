import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOrderDTO } from './dtos/create-order.dto';

@ApiTags('order')
@Controller({ path: 'api/order', scope: Scope.REQUEST })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() createOrderDTO: CreateOrderDTO) {
    const resultado = await this.orderService.createSale(createOrderDTO);
    return resultado;
  }

  @UseGuards(AuthGuard)
  @Get('get-by-id/:id')
  async getById(@Param('id') id: string) {
    const sale = await this.orderService.findById(id);
    return sale;
  }
  @UseGuards(AuthGuard)
  @Get('get-by-product-id/:productId')
  async getByProductId(@Param('productId') productId: string) {
    const sales = await this.orderService.findByProductId(productId);
    return sales;
  }

  @UseGuards(AuthGuard)
  @Get('get-all')
  async getAll() {
    return await this.orderService.findAll();
  }
}
