import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from './cqurs.event';

export class TestEvent extends CqrsEvent implements IEvent {
  constructor() {
    super(TestEvent.name);
  }
}
