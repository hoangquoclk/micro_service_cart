import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

import { HeadersInterceptor } from '@shared/interceptors/headers.interceptor';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { swaggerConfig } from '@configs/swagger/swagger.config';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
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
  app.useGlobalGuards(new HeadersInterceptor());

  await swaggerConfig(app, []);

  const port = process.env.PORT || 3003;

  await app
    .listen(port)
    .then(() => console.log(`Application running at port: ${port}`));
}
bootstrap();
