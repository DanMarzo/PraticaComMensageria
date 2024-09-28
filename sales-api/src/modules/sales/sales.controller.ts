import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuardService } from '../auth/auth-guard/auth-guard.service';

@Controller('api/sales')
export class SalesController {
  constructor() {}

  @UseGuards(AuthGuardService)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
