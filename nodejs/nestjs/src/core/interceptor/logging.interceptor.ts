import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url } = context.getArgByIndex(0);
    this.logger.log(`\n[Request] to ${method} ${url}`);
    // console.log('Before...');
    // const now = Date.now();

    return next
      .handle()
      .pipe(
        tap((data) =>
          this.logger.log(
            `\n[Response] from ${method} ${url}\n response: ${JSON.stringify(data)}`,
          ),
        ),
      );
  }
}
