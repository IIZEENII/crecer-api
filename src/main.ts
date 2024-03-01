import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { HttpExceptionFilter } from './shared/infrastructure/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8080);
}
bootstrap();
