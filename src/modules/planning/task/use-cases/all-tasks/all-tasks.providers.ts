import { Provider } from '@nestjs/common';
import { AllTasksResolver } from './all-tasks.resolver';
import { AllTasksUseCase } from './all-tasks.use-case';

export const allTasksProviders: Provider[] = [
  AllTasksResolver,
  AllTasksUseCase,
];
