import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { SignInDto } from '../../dto/auth/sign-in.dto';
import { UserEntity } from '../users/infra/db/entity/user.entity';

@Injectable()
export class AuthService {
  // TODO: get jwt secret from env
  jwtSecret = 'secret';
  // constructor(
  //   @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>
  // ) {}

  login(signInDto: SignInDto) {
    const payload = { ...signInDto };

    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: '1d',
      audience: 'example.com',
      issuer: 'example.com',
    });
  }

  verify(jwtString: string) {
    try {
      const payload = jwt.verify(jwtString, this.jwtSecret) as (
        | jwt.JwtPayload
        | string
      ) &
        UserEntity;
      const { id, email } = payload;
      return {
        userId: id,
        email,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
