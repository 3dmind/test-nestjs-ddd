import { Provider } from '@nestjs/common';
import { DiscardAllArchivedTasksResolver } from './discard-all-archived-tasks.resolver';
import { DiscardAllArchivedTasksUseCase } from './discard-all-archived-tasks.usecase';

export const discardAllArchivedTasksProviders: Provider[] = [
  DiscardAllArchivedTasksResolver,
  DiscardAllArchivedTasksUseCase,
];
