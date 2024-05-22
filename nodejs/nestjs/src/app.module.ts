import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseService } from './base/base-service';
import { ServiceA } from './base/service-a';
import { ServiceB } from './base/service-b';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController, UsersController],
  providers: [UsersService, AppService, BaseService, ServiceA, ServiceB],
})
export class AppModule {}
