import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchController } from './batch.controller';
import { CronTaskService } from './cron-task.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [BatchController],
  providers: [CronTaskService],
})
export class BatchModule {}
