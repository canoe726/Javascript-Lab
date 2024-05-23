import { Module } from '@nestjs/common';
import { CommonModule } from 'src/services/common/common.module';

@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
