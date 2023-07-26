import { SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { DocumentBuilder } from '@nestjs/swagger';
import { AppDataSource } from './database/config/TypeOrmConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  // for production
  app.enableCors();
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 500, // limit each IP to 100 requests per windowMs
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Shopping mall')
    .setDescription('Shopping mall API\\"s')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Bearer' },
      'Bearer',
    )
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await AppDataSource.initialize();
  await app.listen(3001);
}
bootstrap();
