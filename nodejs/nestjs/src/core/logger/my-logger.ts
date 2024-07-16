import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    // eslint-disable-next-line prefer-rest-params
    super.error.apply(this, arguments);
    this.customError();
  }

  customError() {
    // DB에 저장
  }
}
