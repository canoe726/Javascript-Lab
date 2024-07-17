import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  InternalServerErrorException,
  Logger,
  LoggerService,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ErrorInterceptor } from 'src/core/interceptor/error.interceptor';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UserInfoDto } from 'src/dto/user/user-info.dto';
import { UserLoginDto } from 'src/dto/user/user-login.dto';
import { VerifyEmailDto } from 'src/dto/user/verify-email.dto';
import { AuthGuard } from '../auth/auth-guard';
import { ClassRolesGuard } from '../role/role-guard.class';
import { HandlerRolesGuard } from '../role/role-guard.handler';
import { Roles } from '../role/role.decorator';
import { CreateUserCommand } from './cqrs/create-users.command';
import { UsersService } from './users.service';

@UseGuards(ClassRolesGuard)
@Roles('admin')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly usersService: UsersService,
    private commandBus: CommandBus,
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

    const { name, email, password } = createUserDto;
    const command = new CreateUserCommand(name, email, password);

    await this.commandBus.execute(command);
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

  @UseInterceptors(ErrorInterceptor)
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserInfo(
    @Headers() headers,
    @Param('id') userId: string,
  ): Promise<UserInfoDto> {
    // throw new InternalServerErrorException();
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
