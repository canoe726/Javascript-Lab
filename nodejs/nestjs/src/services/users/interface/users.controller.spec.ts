describe('first', () => {
  it('test', () => {});
});

// import { ConfigService } from '@nestjs/config';
// import { CqrsModule } from '@nestjs/cqrs';
// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from 'src/services/auth/auth.module';
// import { EmailService } from 'src/services/email/email.service';
// import { Repository } from 'typeorm';
// import { Logger } from 'winston';
// import { CreateUserHandler } from '../command/create-users.handler';
// import { UserFactory } from '../domain/user.factory';
// import { UserEventsHandlers } from '../events/user-events.handler';
// import { UserEntity } from '../infra/db/entity/user.entity';
// import { UsersService } from '../users.service';
// import { UsersController } from './users.controller';

// const env = () => ({
//   service: 'Gmail',
//   auth: {
//     user: 'user',
//     pass: 'pass',
//   },
//   baseUrl: 'http://localhost:3000',
// });

// export type MockType<T> = {
//   [P in keyof T]?: jest.Mock<{}>;
// };

// export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
//   () => ({
//     findOne: jest.fn((entity) => entity),
//     save: jest.fn((entity) => entity),
//   }),
// );

// describe('UsersController', () => {
//   let controller: UsersController;
//   let repositoryMock: MockType<Repository<UserEntity>>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [AuthModule, TypeOrmModule.forFeature([UserEntity]), CqrsModule],
//       controllers: [UsersController],
//       providers: [
//         ConfigService,
//         {
//           provide: 'CONFIGURATION(email)',
//           useFactory: env,
//         },
//         {
//           provide: getRepositoryToken(UserEntity),
//           useFactory: repositoryMockFactory,
//         },
//         EmailService,
//         UsersService,
//         UserFactory,
//         CreateUserHandler,
//         UserEventsHandlers,
//         Logger,
//       ],
//     }).compile();

//     repositoryMock = module.get(getRepositoryToken(UserEntity));
//     controller = module.get<UsersController>(UsersController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
