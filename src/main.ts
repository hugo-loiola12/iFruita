// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita validação global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos não especificados nos DTOs
      forbidNonWhitelisted: true, // lança erro se receber campos extras
      transform: true, // converte payloads (e.g., strings para números se DTO exigir)
    }),
  );

  await app.listen(3000);
  console.log(`Aplicação rodando em: http://localhost:3000`);
}
bootstrap();
