import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IUserRepository } from '../domain/repository/user-repository';
import { TestEvent } from '../domain/test.event';
import { UserCreatedEvent } from '../domain/user-created.event';
import { UserEntity } from '../infra/db/entity/user.entity';
import { CreateUserDto } from '../interface/dto/create-user.dto';
import { CreateUserCommand } from './create-users.command';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @Inject('UserRepository') private userRepository: IUserRepository,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand) {
    const { name, email, password } = command;

    this.createUser({ email, name, password });
    this.eventBus.publish(new UserCreatedEvent(email, ''));
    this.eventBus.publish(new TestEvent());
  }

  async createUser({ email, name, password }: CreateUserDto) {
    const user = await this.userRepository.findByEmail(email);
    // const userExist = await this.checkUserExists(email);
    if (user) {
      throw new UnprocessableEntityException(
        '해당 이메일로는 가입할 수 없습니다.',
      );
    }
    const signupVerifyToken = uuid();

    await this.saveUser(name, email, password, signupVerifyToken);
  }

  private async checkUserExists(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    return Boolean(user);
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new UserEntity();
    user.id = uuid();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;

    return await this.usersRepository.save(user);
  }
}
