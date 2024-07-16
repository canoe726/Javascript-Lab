import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import { AppModule } from './app.module';

const winstonDailyRotateOption = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: `./logs/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 30,
    zippedArchive: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      nestWinstonModuleUtilities.format.nestLike(process.env.NODE_ENV, {
        colors: false,
        prettyPrint: true,
      }),
    ),
  };
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // winston transport
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              colors: true,
              prettyPrint: true,
              processId: true,
              appName: true,
            }),
          ),
        }),
        new winstonDaily(winstonDailyRotateOption('info')),
      ],
    }),
  });
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // app.use(LoggerMiddleware)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // app.useGlobalGuards(new AuthGuard());
  await app.listen(3000);
}
bootstrap();
