import { UnprocessableEntityException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as ulid from 'ulid';
import * as uuid from 'uuid';
import { UserFactory } from '../domain/user.factory';
import { UserRepository } from './../infra/db/repository/user.repository';
import { CreateUserCommand } from './create-users.command';
import { CreateUserHandler } from './create-users.handler';

jest.mock('uuid');
jest.mock('ulid');
jest.spyOn(uuid, 'v4').mockReturnValue('0000-0000-0000-0000');
jest.spyOn(ulid, 'ulid').mockReturnValue('ulid');

describe('CreateUserHandler', () => {
  let createUserHandler: CreateUserHandler;
  let userFactory: UserFactory;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        {
          provide: UserFactory,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: 'UserRepository',
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    createUserHandler = module.get(CreateUserHandler);
    userFactory = module.get(UserFactory);
    userRepository = module.get('UserRepository');
  });

  const id = ulid.ulid();
  const name = 'Dexter';
  const email = 'dexter.haan@gmail.com';
  const password = 'pass1234';
  const signupVerifyToken = uuid.v4();

  describe('execute', () => {
    it('should execute CreateUserCommand', async () => {
      // Given
      userRepository.findByEmail = jest.fn().mockResolvedValue(null);

      // When
      await createUserHandler.execute(
        new CreateUserCommand(name, email, password),
      );

      // Then
      expect(userRepository.save).toHaveBeenCalledWith(
        id,
        name,
        email,
        password,
        signupVerifyToken,
      );

      expect(userFactory.create).toHaveBeenCalledWith(
        id,
        name,
        email,
        password,
        signupVerifyToken,
      );
    });

    it('should throw UnprocessableEntityException when user exists', async () => {
      // Given
      userRepository.findByEmail = jest.fn().mockResolvedValue({
        id,
        name,
        email,
        password,
        signupVerifyToken,
      });

      // When
      // Then
      await expect(
        createUserHandler.execute(new CreateUserCommand(name, email, password)),
      ).rejects.toThrow(UnprocessableEntityException);
    });
  });
});
