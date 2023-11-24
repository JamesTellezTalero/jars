import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ApiResponseModel } from './general-models/api-response.model';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const options: SwaggerDocumentOptions = {
    extraModels: [ApiResponseModel],
  };

  const config = new DocumentBuilder()
    .setTitle('Jars Docs')
    .setDescription('API For Incomes Managment')
    .setVersion('1.0')
    .addTag('jars')
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  console.log('http://localhost:3000');
}
bootstrap();
