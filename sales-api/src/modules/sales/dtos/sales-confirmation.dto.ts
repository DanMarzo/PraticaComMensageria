import { OrderStatusEnum } from 'src/domain/order-status.enum';

class SalesConfirmationDTO {
  salesId: string;
  status: OrderStatusEnum;
}

// enum SalesStatusEnum {
//   APPROVED,
//   REJECT,
// }

export { SalesConfirmationDTO };
