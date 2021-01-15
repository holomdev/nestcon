import { Module } from '@nestjs/common';
import { tasksProvider } from './providers/tasks.provider';
import { TenancyModule } from '../tenancy/tenancy.module';

@Module({
  imports: [TenancyModule],
  providers: [tasksProvider],
  exports: ['TASK'],
})
export class EntitiesModule {}
