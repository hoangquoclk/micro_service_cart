import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { swaggerConfig } from '@configs/swagger/swagger.config';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ErrorInterceptor());

  app.setGlobalPrefix(process.env.API_PREFIX);

  await swaggerConfig(app, []);

  const port = process.env.PORT || 3001;

  await app
    .listen(port)
    .then(() => console.log(`Application running at port: ${port}`));
}
bootstrap();
