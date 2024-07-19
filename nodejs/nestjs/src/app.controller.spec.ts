import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BatchModule } from './batch/batch.module';
import { CoreModule } from './core/core.module';
import { ExceptionModule } from './core/filter/exception.module';
import { LoggingModule } from './core/logger/logging.module';
import { LoggerModule } from './core/logger/my-logger.module';
import { AuthModule } from './services/auth/auth.module';
import { BaseModule } from './services/base/base.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TerminusModule,
        HttpModule,
        LoggerModule,
        LoggingModule,
        BatchModule,
        CoreModule,
        BaseModule,
        AuthModule,
        ExceptionModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root2', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
