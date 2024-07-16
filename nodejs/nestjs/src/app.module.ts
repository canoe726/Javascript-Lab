import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import emailConfig from './config/email-config';
import { TypeormConfig } from './config/typeorm-config';
import { CoreModule } from './core/core.module';
import { LoggerMiddleware } from './core/middleware/logger.middleware';
import { AuthModule } from './services/auth/auth.module';
import { BaseModule } from './services/base/base.module';
import { UsersController } from './services/users/users.controller';
import { UsersModule } from './services/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude({path: '/users', method: RequestMethod.GET})
      .forRoutes(UsersController);
    // .forRoutes('/users');
  }
}
