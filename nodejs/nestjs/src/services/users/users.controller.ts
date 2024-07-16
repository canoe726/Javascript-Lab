import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger } from 'nest-winston';
import { AuthGuard } from '../auth/auth-guard';
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
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: WinstonLogger,
    private readonly usersService: UsersService,
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
    this.printLoggerServiceLog(createUserDto);
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

  private printLoggerServiceLog(dto: any) {
    try {
      throw new InternalServerErrorException('test');
    } catch (e) {
      this.logger.error('error : ', JSON.stringify(dto), e.stack);
    }

    this.logger.error('level: error : ', JSON.stringify(dto));
    this.logger.warn('level: warn : ', JSON.stringify(dto));
    this.logger.log('level: log : ', JSON.stringify(dto));
    this.logger.verbose('level: verbose : ', JSON.stringify(dto));
    this.logger.debug('level: debug : ', JSON.stringify(dto));
  }
}
