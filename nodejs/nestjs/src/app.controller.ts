import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthGuard } from './services/auth/AuthGuard';
import { ServiceB } from './services/base/service-b';
import { CommonService } from './services/common/common.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly serviceB: ServiceB,
    private readonly commonService: CommonService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  getHello(@Req() req: Request): string {
    return this.appService.getHello();
  }

  @Get('/serviceB')
  getHelloC(): string {
    return this.serviceB.getHello();
  }

  @Get('/common-hello')
  getCommonHello(): string {
    return this.commonService.hello();
  }
}
