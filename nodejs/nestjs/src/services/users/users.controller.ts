import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth-guard';
import { AuthService } from '../auth/auth.service';
import { ClassRolesGuard } from '../role/role-guard.class';
import { HandlerRolesGuard } from '../role/role-guard.handler';
import { Roles } from '../role/role.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UsersService } from './users.service';

@UseGuards(ClassRolesGuard)
@Roles('admin')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(HandlerRolesGuard)
  @Roles('admin')
  @Get()
  async getUser() {
    return {
      name: 'Test',
    };
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
  }

  @Post('/email-verify')
  async verifyEmail(
    @Query() { signupVerifyToken }: VerifyEmailDto,
  ): Promise<string> {
    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<string> {
    return await this.usersService.login(userLoginDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserInfo(
    @Headers() headers,
    @Param('id') userId: string,
  ): Promise<UserInfoDto> {
    return await this.usersService.getUserInfo(userId);
  }
}
