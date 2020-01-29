import { Provider } from '@nestjs/common';
import { EditTaskResolver } from './edit-task.resolver';
import { EditTaskUseCase } from './edit-task.use-case';

export const editTaskProviders: Provider[] = [
  EditTaskResolver,
  EditTaskUseCase,
];
