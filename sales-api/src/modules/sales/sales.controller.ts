import {
  Controller,
  UseGuards,
  Body,
  Post,
  Scope,
  Get,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { SalesService } from './sales.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sales')
@Controller({ path: 'api/sales', scope: Scope.REQUEST })
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() createOrderDTO: CreateOrderDTO) {
    const resultado = await this.salesService.createSale(createOrderDTO);
    return resultado;
  }

  @UseGuards(AuthGuard)
  @Get('get-by-id/:id')
  async getById(@Param('id') id: string) {
    const sale = await this.salesService.findById(id);
    return sale;
  }
}
