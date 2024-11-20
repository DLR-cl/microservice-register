import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger('Registro');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
    {
      transport: Transport.TCP,
      options:{
        port: envs.port
      }
    }
  );

  await app.listen();
  logger.log(`Register microservice running on port ${envs.port}`)
}
bootstrap();
