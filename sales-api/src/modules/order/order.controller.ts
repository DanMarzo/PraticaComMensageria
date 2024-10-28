import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { Request } from 'express';
import { formatJson } from 'src/config/utils';

@ApiTags('order')
@Controller({ path: 'api/order', scope: Scope.REQUEST })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Req() req: Request, @Body() createOrderDTO: CreateOrderDTO) {
    const { transactionid, serviceid } = req.headers;
    console.info(
      `Request to POST create order with data: ${formatJson(createOrderDTO)} | [Transactionid: ${transactionid} | ServiceId: ${serviceid}]`,
    );

    const resultado = await this.orderService.createSale(
      createOrderDTO,
      serviceid as string,
      transactionid as string,
    );

    console.info(`Response to POST create order with data:
        ${formatJson(resultado)} | [Transactionid: ${transactionid} | ServiceId: ${serviceid}]`);
    return resultado;
  }

  @UseGuards(AuthGuard)
  @Get('get-by-id/:id')
  async getById(@Req() req: Request, @Param('id') id: string) {
    const { transactionid, serviceid } = req.headers;
    console.info(
      `Request to Get get-by-id with param: ${id} | [Transactionid: ${transactionid} | ServiceId: ${serviceid}]`,
    );
    const sale = await this.orderService.findById(id);
    console.info(
      `Response to Get get-by-id with data: ${formatJson(sale)} | [Transactionid: ${transactionid} | ServiceId: ${serviceid}]`,
    );
    return sale;
  }
  @UseGuards(AuthGuard)
  @Get('get-by-product-id/:productId')
  async getByProductId(
    @Req() req: Request,
    @Param('productId') productId: string,
  ) {
    const { transactionid, serviceid } = req.headers;
    console.info(
      `Request to Get get-by-product-id with param: ${productId} | [Transactionid: ${transactionid} | ServiceId: ${serviceid}]`,
    );
    const sales = await this.orderService.findByProductId(productId);
    console.info(
      `Response to Get get-by-product-id with data: ${formatJson(sales)} | [Transactionid: ${transactionid} | ServiceId: ${serviceid}]`,
    );
    return sales;
  }

  @UseGuards(AuthGuard)
  @Get('get-all')
  async getAll(@Req() req: Request) {
    const { transactionid, serviceid } = req.headers;
    console.info(
      `Request to Get get-all with none param | [Transactionid: ${transactionid} | ServiceId: ${serviceid}]`,
    );
    const orders = await this.orderService.findAll();
    console.info(
      `Response to Get get-all with data: ${formatJson(orders)} | [Transactionid: ${transactionid} | ServiceId: ${serviceid}]`,
    );
    return orders;
  }
}
