import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { json, urlencoded } from 'express';
import { initializeTransactionalContext } from 'typeorm-transactional';

dotenv.config();

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  const options = new DocumentBuilder()
    .setTitle('App API Documentation')
    .setDescription('The App API description')
    .setVersion('1.0')
    .addTag('App-api')
    .addBearerAuth({
      type: 'http',
      name: 'Authorization',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
  // Use global validation pipe.
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //TODO
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));
  // Enable CORS for AWS.
  app.enableCors();
  const server = await app.listen(process.env.EXPRESS_PORT || 3000);
  const timeout = 1000 * 60 * 3;
  server.setTimeout(timeout);
}
bootstrap();
