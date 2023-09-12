import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // const config = new DocumentBuilder()
  //   .setTitle('Smart Library API')
  //   .setDescription('API for Smart Library')
  //   .setVersion('1.0')
  //   .addTag('smart-library')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  app.use('/public', express.static('public'));

  await app.listen(3000);
}
bootstrap();
