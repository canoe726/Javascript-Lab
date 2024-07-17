import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersService } from '../users.service';
import { CreateUserCommand } from './create-users.command';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private usersService: UsersService) {}

  async execute(command: CreateUserCommand) {
    const { name, email, password } = command;
    console.log('createUserDto: ', command);

    await this.usersService.createUser({ name, email, password });
  }
}
