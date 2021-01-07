import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private taskRepository: TasksRepository,
  ) {}

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTask(id: number): Promise<Task> {
    return this.taskRepository.findOne(id);
  }

  async createTask(taskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(taskDto);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with "${id}" not found`);
    }
  }

  async updateTask(id: number, taskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.updateTask(id, taskDto);
  }
}
