import { Provider } from '@nestjs/common';
import { AllArchivedTasksUseCase } from './all-archived-tasks.use-case';
import { AllArchivedTasksResolver } from './all-archived-tasks.resolver';

export const allArchivedTasksProviders: Provider[] = [
  AllArchivedTasksResolver,
  AllArchivedTasksUseCase,
];
