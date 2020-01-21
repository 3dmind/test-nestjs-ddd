import { Provider } from '@nestjs/common';
import { EditTaskResolver } from './edit-task.resolver';
import { EditTaskUseCase } from './edit-task.usecase';

export const editTaskProviders: Provider[] = [
  EditTaskResolver,
  EditTaskUseCase,
];
