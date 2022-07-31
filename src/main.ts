import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // configure class-validator to use validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // configure swagger 
  const config = new DocumentBuilder()
    .setTitle('Catalogue API')
    .setDescription('The catalogue API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // configure cors
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(/\s*,\s*/) ?? '*',
    credentials: true,
    exposedHeaders: ['Authorization'],
  });
  // configure port & start server
  await app.listen(env.APP_PORT || 3000);
}

bootstrap();
