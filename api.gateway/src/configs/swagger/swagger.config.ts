import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export const swaggerConfig = async function conf(
  app: INestApplication,
  modules: any[],
): Promise<void> {
  const APP_VERSION = process.env.npm_package_version;

  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .setVersion(APP_VERSION)
    .setContact('Vinicius', 'N/A', 'vinicius.smelo54@gmail.com')
    .addServer(process.env.SWAGGER_SERVER)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'bearerAuth',
    )
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    include: modules,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup(process.env.SWAGGER_DOCS, app, document);
};
