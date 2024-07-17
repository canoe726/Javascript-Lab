import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { BadRequestException } from './core/exception';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
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

  @UseInterceptors(ErrorInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    throw new InternalServerErrorException();
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
