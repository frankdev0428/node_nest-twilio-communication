require('dotenv').config({ path: '.env.local' });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { logger } from './middleware/logger.middleware';
import * as Express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import User from './entity/user.entity';
import { ExpressAdapter } from '@nestjs/platform-express';

const server = Express();
server.use(cors());

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: [process.env.WEB_SOCKET_ORIGIN, "https://*.communicate.io", "http://busin.communicate.io", "https://test.communicate.io", 'https://business.communicate.io', 'http://localhost:3001', 'http://authpoc.communicate.io', 'https://authpoc.communicate.io'],
    // origin: "*",
    credentials: true,
  });
  // app.use(logger);
  app.use(morgan('tiny'));

  const config = new DocumentBuilder()
    .setTitle('communicate API Guide')
    .setDescription('communicate API description')
    .setVersion('1.0')
    .addBearerAuth(
      { 
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header'
      },
      'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [
      User
    ]
  });
  SwaggerModule.setup('api-document', app, document);
  
  await app.listen(process.env.PORT);
}
bootstrap();
