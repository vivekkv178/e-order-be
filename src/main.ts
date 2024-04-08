import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        target: false,
      },
      transform: true,
      transformOptions: {
        excludeExtraneousValues: true,
      },
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  /** Had to add this to solve module not found error in Vercels */
  console.log(hbs);

  const config = new DocumentBuilder()
    .setTitle('Ecom-API')
    .setDescription(
      'This API lets organizations add their Products on the Ecom-Site',
    )
    .addApiKey(
      {
        type: 'apiKey',
        description: 'API key authentication',
        name: 'x-api-key',
        in: 'header',
      },
      'ApiKeyHeader',
    )
    .setVersion('1.0')
    // .addServer('https://google.com')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
