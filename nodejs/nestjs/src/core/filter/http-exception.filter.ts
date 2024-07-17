import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    console.log('exception: ', exception);

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    const response = (exception as HttpException).getResponse();

    const stack = exception.stack;
    const log = {
      timestamp: new Date(),
      url: req.url,
      response,
      stack,
    };
    this.logger.log(log);

    res.status((exception as HttpException).getStatus()).json(response);
  }
}
