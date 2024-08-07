import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EmailService } from 'src/services/email/email.service';
import { TestEvent } from '../domain/test.event';
import { UserCreatedEvent } from '../domain/user-created.event';

@EventsHandler(UserCreatedEvent, TestEvent)
export class UserEventsHandlers
  implements IEventHandler<UserCreatedEvent | TestEvent>
{
  constructor(private emailService: EmailService) {}

  async handle(event: UserCreatedEvent | TestEvent) {
    switch (event.name) {
      case UserCreatedEvent.name: {
        console.log('UserCreatedEvent!');
        const { email, signupVerifyToken } = event as UserCreatedEvent;
        await this.emailService.sendMemberJoinVerification(
          email,
          signupVerifyToken,
        );
        break;
      }
      case TestEvent.name: {
        console.log('TestEvent!');
        break;
      }
      default:
        break;
    }
  }
}
