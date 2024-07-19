import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';

const env = () => ({
  service: 'Gmail',
  auth: {
    user: 'user',
    pass: 'pass',
  },
  baseUrl: 'http://localhost:3000',
});

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        {
          provide: 'CONFIGURATION(email)',
          useFactory: env,
        },
        EmailService,
      ],
    }).compile();

    service = await module.resolve<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
