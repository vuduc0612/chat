import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Cho phép tất cả các origin, thay '*' bằng danh sách các origin cụ thể để tăng cường bảo mật
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Các phương thức HTTP được cho phép
    allowedHeaders: 'Content-Type, Accept', // Các tiêu đề được cho phép
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  await app.listen(3001);
}
bootstrap();
