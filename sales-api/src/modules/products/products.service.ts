import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Product } from 'src/domain/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly httpService: HttpService) {}

  async checkProductStock(
    token: string,
    transactionid: string,
    products: Array<Product>,
  ): Promise<boolean> {
    try {
      const response = await this.httpService.axiosRef.post(
        'api/product/check-stock',
        //Verificar essa request
        { products: [...products] },
        { headers: { Authorization: token, transactionid } },
      );
      return response.status == 200 || response.status == 201;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new BadRequestException(error.response.data);
      } else {
        throw new BadRequestException(
          `Erro desconhecido ${JSON.stringify(error)}`,
        );
      }
    }
  }
}
