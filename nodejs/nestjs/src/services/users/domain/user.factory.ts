import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { User } from './user';
import { UserCreatedEvent } from './user-created.event';

@Injectable()
export class UserFactory {
  constructor(private eventBus: EventBus) {}

  create(
    id: string,
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new User(id, name, email, password, signupVerifyToken);

    this.eventBus.publish(new UserCreatedEvent(email, signupVerifyToken));
    return user;
  }

  reconstitute(
    id: string,
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return new User(id, name, email, password, signupVerifyToken);
  }
}
