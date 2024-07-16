import {
  Controller,
  Get,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthGuard } from './services/auth/auth-guard';
import { User } from './services/auth/auth-user.decorator';
import { UserEntity } from './services/auth/dto/auth-user.dto';
import { ServiceB } from './services/base/service-b';
import { CommonService } from './services/common/common.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly serviceB: ServiceB,
    private readonly commonService: CommonService,
  ) {}

  @Get()
  getHello(@User() user: UserEntity, @Req() req: Request): string {
    console.log(user);
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Get('/username')
  getHello2(@User('name') name: string): string {
    return name;
  }

  @UseGuards(AuthGuard)
  @Get('/username/with-pipe')
  getHello3(
    @User(new ValidationPipe({ validateCustomDecorators: true }))
    user: UserEntity,
  ) {
    return user;
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
