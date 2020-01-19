import { Provider } from '@nestjs/common';
import { TASK_MODEL_INJECTION_TOKEN } from './constants';
import { TaskMapper } from './task.mapper';
import { TaskModel } from './task.model';
import { TaskRepository } from './task.repository';

export const taskProviders: Provider[] = [
  {
    provide: TASK_MODEL_INJECTION_TOKEN,
    useValue: TaskModel,
  },
  TaskMapper,
  TaskRepository,
];
