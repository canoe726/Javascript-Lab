import { EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user';
import { UserFactory } from './user.factory';

describe('UserFactory', () => {
  let userFactory: UserFactory;
  let eventBus: jest.Mocked<EventBus>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserFactory,
        {
          provide: EventBus,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    userFactory = module.get(UserFactory);
    eventBus = module.get(EventBus);
  });

  describe('create', () => {
    it('should create user', () => {
      // Given
      // When
      const user = userFactory.create(
        'user-id',
        'example-name',
        'example-email',
        'example-password',
        'token',
      );

      // Then
      const expected = new User(
        'user-id',
        'example-name',
        'example-email',
        'example-password',
        'token',
      );
      expect(expected).toEqual(user);
      expect(eventBus.publish).toHaveBeenCalledTimes(1);
    });

    it('should throw error when user already exist', () => {
      // Given
      // When
      // Then
    });
  });
});
