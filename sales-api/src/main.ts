import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Sales example')
    .setDescription('The Sales API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const configService = app.get(ConfigService);

  const queueSales = configService.get('SALES_CONFIRMATION_QUEUE');
  console.log(queueSales);

  const microservicesSales: MicroserviceOptions = {
    transport: Transport.RMQ,
    options: {
      urls: configService.get('RABBIT_MQ_CONN'),
      queue: queueSales,
      noAck: false,
      queueOptions: { durable: true },
      socketOptions: {
        clientProperties: {
          connectionName: 'sales-confirmation.queue',
        },
      },
    },
  };

  const microservicesProduct = {
    transport: Transport.RMQ,
    options: {
      urls: configService.get('RABBIT_MQ_CONN'),
      queue: configService.get('PRODUCT_STOCK_UPDATE_QUEUE'),
      queueOptions: { durable: true },
    },
  };
  app.connectMicroservice(microservicesSales);
  app.connectMicroservice(microservicesProduct);

  await app.startAllMicroservices();
  await app.listen(8082);
}
bootstrap();
