import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'src/config/typeorm-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { CoreModule } from './core/core.module';
import { BaseModule } from './services/base/base.module';
import { UserEntity } from './services/users/entities/user.entity';
import { UsersModule } from './services/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [emailConfig],
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      ...typeORMConfig,
      entities: [UserEntity],
    }),
    CoreModule,
    BaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
