import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { NotIn } from 'src/core/decorator/not-in';

export class CreateUserDto {
  // @Transform((params) => {
  //   return params.value.replace(/ /g, '').trim();
  // })
  @NotIn('password')
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  readonly name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  // @Transform(({ value, obj }) => {
  //   console.log('obj: ', obj);
  //   if (obj.password.includes(obj.name.trim())) {
  //     throw new BadRequestException(
  //       'password는 name과 같은 문자열을 포함할 수 없습니다.',
  //     );
  //   }
  //   return value.trim();
  // })
  @IsString()
  @IsOptional()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password?: string;
}
