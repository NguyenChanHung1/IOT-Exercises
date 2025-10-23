import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
