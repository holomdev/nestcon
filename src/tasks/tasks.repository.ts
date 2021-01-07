import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(taskDto: CreateTaskDto): Promise<Task> {
    const { name } = taskDto;
    try {
      const task = new Task();
      task.name = name;
      await task.save();
      return task;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async updateTask(id: number, taskDto: CreateTaskDto): Promise<Task> {
    const { name } = taskDto;
    try {
      const task = await this.findOne(id);
      task.name = name;
      return await task.save();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
