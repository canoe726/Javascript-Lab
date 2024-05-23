import { Module } from '@nestjs/common';
import { BaseService } from './base-service';
import { ServiceA } from './service-a';
import { ServiceB } from './service-b';

@Module({
  providers: [ServiceA, ServiceB, BaseService],
  exports: [ServiceB],
})
export class BaseModule {}
