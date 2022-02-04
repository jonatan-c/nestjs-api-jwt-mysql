import { ConfigService } from '@nestjs/config';
import { setDefaultUser } from './config/default-user';
import { initSwagger } from './app.swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const config = app.get(ConfigService);
  const port = 3000;

  initSwagger(app);
  setDefaultUser(config);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(port);
  logger.log(`Server is running in http://localhost:${port} `);
}
bootstrap();

//min 1.37
