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
    //.addTag('sales')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const configService = app.get(ConfigService);

  const microservicesOption: MicroserviceOptions = {
    transport: Transport.RMQ,
    options: {
      urls: configService.get('RABBIT_MQ_CONN'),
      queueOptions: { durable: true },
    },
  };

  app.connectMicroservice<MicroserviceOptions>(microservicesOption);
  await app.startAllMicroservices();
  await app.listen(8082);
}
bootstrap();
