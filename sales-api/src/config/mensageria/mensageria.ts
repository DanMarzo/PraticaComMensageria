import { ConfigService } from '@nestjs/config';
import {} from 'amqplib';

// export const RabbitMQProvider = {
//   provide: 'RABBITMQ_PROVIDER',
//   useFactory: async (configService: ConfigService) => {
//     const uri = configService.get<string>('RABBITMQ_URI');
//     const conn = await connect(uri);
//     const channel = await conn.createChannel();
//     return channel;
//   },
//   inject: [ConfigService],
// };
