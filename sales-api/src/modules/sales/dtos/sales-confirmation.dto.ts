import { OrderStatusEnum } from 'src/domain/order-status.enum';

class SalesConfirmationDTO {
  salesId: string;
  status: OrderStatusEnum;
}

export { SalesConfirmationDTO };
