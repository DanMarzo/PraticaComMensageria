import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private readonly httpService: HttpService) {}

  async teste() {
    await this.httpService.get('/');
  }
}
