import { Controller, Get, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { SalesService } from './sales.service';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Controller('api/sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UseGuards(AuthGuard)
  @Get('create')
  async getProfile(@Request() req, @Body() createOrderDTO: CreateOrderDTO) {
    const resultado = await this.salesService.createSale(
      createOrderDTO,
      req.userInfo,
    );
    return resultado;
  }
}
