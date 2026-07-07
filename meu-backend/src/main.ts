import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Global Validation với custom error format
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        // Lấy tất cả message lỗi từ tất cả các field
        const messages = errors.flatMap((error) =>
          Object.values(error.constraints || {}),
        );
        return new BadRequestException({
          statusCode: 400,
          message: messages[0] || 'Dữ liệu không hợp lệ!',
          errors: messages,
        });
      },
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 8000;

  await app.listen(port);
  console.log(`Backend Application is running on: http://localhost:${port}`);
}
bootstrap();
