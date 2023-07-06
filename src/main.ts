// import {NestFactory} from '@nestjs/core';
// import {AppModule} from './app.module';
// import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
// import * as express from 'express';
// import { join } from 'path';

// async function bootstrap() {
//     const app = await NestFactory.create(AppModule, {cors: false});

//     app.enableCors({credentials: true, origin: "*"})

//     app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

//     const config = new DocumentBuilder()
//         .setTitle('API')
//         .setDescription('The CloudStorage API description')
//         .setVersion('1.0')
//         .addBearerAuth()
//         .build();
//     const document = SwaggerModule.createDocument(app, config);
//     SwaggerModule.setup('swagger', app, document);
//     SwaggerModule.setup('swagger', app, document, {
//         swaggerOptions: {
//             persistAuthorization: true,
//         },
//     });

//     await app.listen(8000);
// }

// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverless = require('serverless-http');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = '.netlify/functions/main';
  app.setGlobalPrefix(globalPrefix);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverless(expressApp)
}

let server;
export const handler = async (event, context, callback) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};