import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/services/email/email.service';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class UsersService {
  constructor(private readonly emailService: EmailService) {}

  async createUser({ email, name, password }: CreateUserDto) {
    await this.checkUserExists();

    const signupVerifyToken = uuid();

    await this.saveUser(name, email, password, signupVerifyToken);
    // await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private checkUserExists() {
    return false; // TODO:
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  private saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    console.log(name, email, password, signupVerifyToken);
    return; // TODO:
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    throw new Error('Method not implemented');
  }

  async login(userLoginDto: UserLoginDto) {
    console.log(userLoginDto);
    return '';
  }

  async getUserInfo(userId: string): Promise<UserInfoDto> {
    throw new Error('Method not implemented');
  }
}
