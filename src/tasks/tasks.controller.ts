import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '../entities/tenant/task.entity';
import { InsertResult } from 'typeorm';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Get('/:id')
  getTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTask(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() taskDto: CreateTaskDto): Promise<InsertResult> {
    return this.taskService.createTask(taskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) task: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, task);
  }
}
