import { Provider } from '@nestjs/common';
import { TaskModel } from './task.model';

export const taskProviders: Provider[] = [
  {
    provide: 'TASK_MODEL',
    useValue: TaskModel,
  },
];
