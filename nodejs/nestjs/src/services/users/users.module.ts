import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/dto/user/user.entity';
import { EmailModule } from 'src/services/email/email.module';
import { AuthModule } from '../auth/auth.module';
import { CreateUserHandler } from './cqrs/create-users.handler';
import { UserEventsHandlers } from './cqrs/user-events.handler';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    AuthModule,
    EmailModule,
    TypeOrmModule.forFeature([UserEntity]),
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, CreateUserHandler, UserEventsHandlers, Logger],
  exports: [UsersService],
})
export class UsersModule {}
