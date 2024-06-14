import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: false,
      origin: '*',
    },
  });
  await app.listen(3000);
}
bootstrap();
