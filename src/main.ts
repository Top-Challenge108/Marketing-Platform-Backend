import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { urlencoded } from 'express';
import { initializeTransactionalContext } from 'typeorm-transactional';

dotenv.config();

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
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
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Backend Generator',
    customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  // Use global validation pipe.
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //TODO
  app.use(urlencoded({ limit: '10mb', extended: true }));
  // Enable CORS for AWS.
  app.enableCors();
  const server = await app.listen(process.env.EXPRESS_PORT || 3000);
  const timeout = 1000 * 60 * 3;
  server.setTimeout(timeout);
}
bootstrap();
