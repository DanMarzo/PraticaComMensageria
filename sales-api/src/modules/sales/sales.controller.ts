import {
  Controller,
  UseGuards,
  Request,
  Body,
  Post,
  Get,
} from '@nestjs/common';
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
  async create(@Request() req, @Body() createOrderDTO: CreateOrderDTO) {
    const resultado = await this.salesService.createSale(
      createOrderDTO,
      req.userInfo,
    );
    return resultado;
  }
  //@UseGuards(AuthGuard)
  @Get('message')
  async teste() {
    await this.salesService.testMessage();
    return {};
  }
}
