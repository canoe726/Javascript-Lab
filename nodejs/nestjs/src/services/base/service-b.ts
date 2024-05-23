import { Injectable } from '@nestjs/common';
import { BaseService } from './base-service';

@Injectable()
export class ServiceB extends BaseService {
  getHello(): string {
    return this.doSomeFuncFromA();
  }
}
