import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/services/email/email.module';
import { AuthModule } from '../auth/auth.module';
import { CreateUserHandler } from './command/create-users.handler';
import { UserFactory } from './domain/user.factory';
import { UserEventsHandlers } from './events/user-events.handler';
import { UserEntity } from './infra/db/entity/user.entity';
import { UsersController } from './interface/users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    AuthModule,
    EmailModule,
    TypeOrmModule.forFeature([UserEntity]),
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [
    UserFactory,
    UsersService,
    CreateUserHandler,
    UserEventsHandlers,
    Logger,
  ],
  exports: [UsersService],
})
export class UsersModule {}
