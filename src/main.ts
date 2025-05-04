import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Klick API') // ✅ API Title
    .setDescription('API documentation for Klick') // ✅ Description
    .setVersion('1.0') // ✅ API Version
    .addBearerAuth() // ✅ Adds JWT authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // ✅ Swagger will be available at `/api-docs`

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
