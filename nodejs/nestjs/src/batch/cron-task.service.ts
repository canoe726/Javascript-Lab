import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class CronTaskService {
  private readonly logger = new Logger(CronTaskService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {
    this.addCronJob();
  }

  // @Cron('* * * * * *', { name: 'cronTask' })
  // @Cron(new Date(Date.now() + 3 * 1000))
  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_1AM)
  handleCron() {
    this.logger.log('Task Called');
  }

  // @Interval('intervalTask', 3000)
  // handleInterval() {
  //   this.logger.log('Task Called by Interval');
  // }

  // @Timeout('timeoutTask', 5000)
  // handleTimeout() {
  //   this.logger.log('Task Called by timeout');
  // }

  addCronJob() {
    const name = 'cronSample';
    const job = new CronJob('* * * * * *', () => {
      this.logger.warn(`run! ${name}`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    this.logger.warn(`job ${name} added!`);
  }
}
