import {
  Controller,
  UseGuards,
  Request,
  Body,
  Post,
  Scope,
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
  async create(@Request() req, @Body() createOrderDTO: CreateOrderDTO) {
    const resultado = await this.salesService.createSale(
      createOrderDTO,
      req.userInfo,
    );
    return resultado;
  }
}
