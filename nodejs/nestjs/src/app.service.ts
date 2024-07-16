import { Injectable } from '@nestjs/common';
import { MyLogger } from './core/logger/my-logger';

@Injectable()
export class AppService {
  constructor(private myLogger: MyLogger) {}

  getHello(): string {
    this.myLogger.error('level: error');
    this.myLogger.warn('level: warn');
    this.myLogger.log('level: log');
    this.myLogger.verbose('level: verbose');
    this.myLogger.debug('level: debug');

    return 'Hello World!';
  }
}
