import { Inject } from '@nestjs/common';
import { ServiceA } from './service-a';

export class BaseService {
  // 상속관계
  @Inject(ServiceA) private readonly serviceA: ServiceA;

  getHello(): string {
    return 'hello world';
  }

  doSomeFuncFromA(): string {
    return this.serviceA.getHello();
  }
}
