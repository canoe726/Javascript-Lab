import {
  Controller,
  Get,
  Param,
  Req,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { BadRequestException } from './core/exception';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { UserEntity } from './dto/auth/auth-user.dto';
import { AuthGuard } from './services/auth/auth-guard';
import { User } from './services/auth/auth-user.decorator';
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
    return this.appService.getHello();
  }

  @UseFilters(HttpExceptionFilter)
  @Get('/error')
  error() {
    throw new Error('test');

    return 'success';
  }

  @Get('/error/:id')
  errorById(@Param('id') id: string): string {
    if (+id < 1) {
      throw new BadRequestException('0보다 커야함', 'id format exception');
    }
    return 'success';
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
