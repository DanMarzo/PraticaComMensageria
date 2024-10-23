import { Injectable, OnModuleInit } from '@nestjs/common';
import { MsgConfigService } from '../msg-config/msg-config.service';
import { ConfigService } from '@nestjs/config';
import { Order, OrderDocument } from 'src/domain/order.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SalesConfirmationDTO } from 'src/modules/sales/dtos/sales-confirmation.dto';

@Injectable()
export class SalesQueueService implements OnModuleInit {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly msgConfigService: MsgConfigService,
    private readonly configService: ConfigService,
    //private readonly salesService: SalesService,
  ) {}
  async onModuleInit() {
    await this.msgConfigService.consume(
      this.configService.get('SALES_CONFIRMATION_QUEUE'),
      async (mensagem) => {
        await this.updateStatus(JSON.parse(mensagem.content.toString()));
      },
    );
  }
  // A implementacao foi feita diretamente,
  // pois havia algum problema ao receber o Service de Order,
  // o que fazia o OnModuleInit nao funcionar
  async updateStatus(salesConfirmartion: SalesConfirmationDTO) {
    const order = await this.orderModel.findById(salesConfirmartion.salesId);
    if (order && order.status != salesConfirmartion.status) {
      await this.orderModel
        .updateOne(
          { _id: order.id }, // Filtro para encontrar o documento
          { $set: { status: salesConfirmartion.status, updateAt: new Date() } }, // Operação de atualização
        )
        .exec();
    }
  }
}
