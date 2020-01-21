import { Provider } from '@nestjs/common';
import { ActiveTasksResolver } from './active-tasks.resolver';
import { ActiveTasksUseCase } from './active-tasks.usecase';

export const activeTasksProviders: Provider[] = [
  ActiveTasksResolver,
  ActiveTasksUseCase,
];
