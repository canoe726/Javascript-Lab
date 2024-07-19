import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'nodemailer/lib/mailer';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/repository/user-repository';
import { User } from '../../../domain/user';
import { UserFactory } from '../../../domain/user.factory';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private connection: Connection,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userFactory: UserFactory,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: { email },
    });
    if (!userEntity) {
      return null;
    }

    const { id, name, signupVerifyToken, password } = userEntity;
    return this.userFactory.reconstitute(
      id,
      name,
      email,
      password,
      signupVerifyToken,
    );
  }

  async save(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ): Promise<void> {
    //
  }
}
