import { ConfigService } from '@nestjs/config';

export function TypeormConfig(configService: ConfigService) {
  return {
    type: configService.get<any>('DB_TYPE') || 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    synchronize: configService.get<boolean>('DB_SYNCHRONIZE') ?? true,
  };
}
