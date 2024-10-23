import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Product } from 'src/domain/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly httpService: HttpService) {}

  async checkProductStock(
    token: string,
    products: Array<Product>,
  ): Promise<boolean> {
    try {
      const response = await this.httpService.axiosRef.post(
        'api/product/check-stock',
        //Verificar essa request
        { products: [...products] },
        { headers: { Authorization: token } },
      );
      return response.status == 200 || response.status == 201;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
      } else {
        console.log(error);
      }
      return false;
    }
  }
}
