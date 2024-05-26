import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import emailConfig from './config/email-config';
import { TypeormConfig } from './config/typeorm-config';
import { CoreModule } from './core/core.module';
import { BaseModule } from './services/base/base.module';
import { UsersModule } from './services/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
      load: [emailConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: TypeormConfig,
      inject: [ConfigService],
    }),
    CoreModule,
    BaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
