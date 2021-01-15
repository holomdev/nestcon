import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { EntitiesModule } from '../entities/entities.module';

@Module({
  imports: [EntitiesModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
