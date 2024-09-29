import { Controller, UseGuards, Request, Body, Post } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { SalesService } from './sales.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sales')
@Controller('api/sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async getProfile(@Request() req, @Body() createOrderDTO: CreateOrderDTO) {
    const resultado = await this.salesService.createSale(
      createOrderDTO,
      req.userInfo,
    );
    return resultado;
  }
}
