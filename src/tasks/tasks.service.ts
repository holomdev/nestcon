import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Task } from '../entities/tenant/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Repository } from 'typeorm';
import * as sql from 'sql-mysql';

@Injectable()
export class TasksService {
  constructor(@Inject('TASK') private taskRepository: Repository<Task>) {}

  async getTasks(): Promise<Task[]> {
    try {
      return await this.taskRepository.query(sql`
        SELECT * FROM task`);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async getTask(id: number): Promise<Task> {
    const condition = { id: id };
    try {
      return await this.taskRepository.query(sql`
      SELECT * FROM task 
      WHERE ${sql.conditions(condition)}
    `);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async createTask(taskDto: CreateTaskDto): Promise<Task> {
    try {
      const result = await this.taskRepository.query(sql`
        INSERT INTO task (${sql.keys(taskDto)})
        VALUES (${sql.values(taskDto)})
      `);

      return await this.getTask(result.insertId);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async deleteTask(id: number): Promise<void> {
    const condition = { id: id };
    const result = await this.taskRepository.query(sql`
      DELETE FROM task WHERE ${sql.conditions(condition)}
    `);

    if (result.affectedRows === 0) {
      throw new NotFoundException(`Task with "${id}" not found`);
    }
  }

  async updateTask(id: number, taskDto: CreateTaskDto): Promise<Task> {
    const condition = { id: id };

    const result = await this.taskRepository.query(sql`
      UPDATE task SET ${sql.assignments(taskDto)} 
      WHERE ${sql.conditions(condition)}
    `);

    if (result.affectedRows === 0) {
      throw new NotFoundException(`Task with "${id}" not found`);
    }

    return await this.getTask(id);
  }
}
