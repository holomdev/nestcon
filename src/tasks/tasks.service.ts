import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Task } from '../entities/tenant/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import {
  Connection,
  InsertResult,
  Repository,
} from 'typeorm';

@Injectable()
export class TasksService {
  private taskRepository: Repository<Task>;
  private readonly database: string | Uint8Array;
  private readonly tableName: string;

  constructor(@Inject('CONNECTION') connection: Connection) {
    this.taskRepository = connection.getRepository(Task);
    this.database = connection.options.database;
    this.tableName = this.taskRepository.metadata.tableName;
  }

  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.query(`select * from task`);
  }

  async getTask(id: number): Promise<Task> {
    const names = await this.taskRepository.query(`
      SELECT \`COLUMN_NAME\` 
      FROM \`INFORMATION_SCHEMA\`.\`COLUMNS\` 
      WHERE \`TABLE_SCHEMA\`='${this.database}' 
      AND \`TABLE_NAME\`='${this.tableName}';`);

    const columnNames = JSON.parse(JSON.stringify(names)).map((column) => {
      return `${this.tableName}.${column.COLUMN_NAME}`;
    });

    return await this.taskRepository
      .createQueryBuilder('task')
      .select(columnNames)
      .where('task.id = :id', { id })
      .getOne();
  }

  async createTask(taskDto: CreateTaskDto): Promise<InsertResult> {
    const { name } = taskDto;
    try {
      return await this.taskRepository
        .createQueryBuilder()
        .insert()
        .into(Task)
        .values({ name: name })
        .execute();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`
  Task
  with
  "${id}"
  not
  found
`);
    }
  }

  async updateTask(id: number, taskDto: CreateTaskDto): Promise<Task> {
    const { name } = taskDto;
    try {
      const task = await this.taskRepository.findOne(id);
      task.name = name;
      return await task.save();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
