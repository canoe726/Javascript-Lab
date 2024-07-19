import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../services/users/interface/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
