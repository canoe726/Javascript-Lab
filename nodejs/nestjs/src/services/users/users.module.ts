import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/services/email/email.module';
import { AuthModule } from '../auth/auth.module';
import { ClassRolesGuard } from '../role/role-guard.class';
import { HandlerRolesGuard } from '../role/role-guard.handler';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [AuthModule, EmailModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: HandlerRolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ClassRolesGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
