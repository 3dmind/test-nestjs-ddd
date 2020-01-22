import { Provider } from '@nestjs/common';
import { ArchivedTasksUseCase } from './archived-tasks.usecase';
import { ArchivedTasksResolver } from './archived-tasks.resolver';

export const archivedTasksProviders: Provider[] = [
  ArchivedTasksResolver,
  ArchivedTasksUseCase,
];
