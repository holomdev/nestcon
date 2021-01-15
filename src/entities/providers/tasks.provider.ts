import { Connection } from 'typeorm';
import { Task } from '../tenant/task.entity';

export const tasksProvider = {
  provide: 'TASK',
  useFactory: (connection: Connection) => connection.getRepository(Task),
  inject: ['CONNECTION'],
};
