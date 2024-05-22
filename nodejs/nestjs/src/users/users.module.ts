import { Module } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, EmailService],
})
export class UsersModule {}
