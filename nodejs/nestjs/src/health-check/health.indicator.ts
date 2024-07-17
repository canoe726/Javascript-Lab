import { HealthIndicatorResult } from '@nestjs/terminus';

export declare abstract class HealthIndicator {
  protected getStatus(
    key: string,
    isHealthy: boolean,
    data?: {
      [key: string]: any;
    },
  ): HealthIndicatorResult;
}
