import { Provider } from '@nestjs/common';
import { AllActiveTasksResolver } from './all-active-tasks.resolver';
import { AllActiveTasksUseCase } from './all-active-tasks.use-case';

export const allActiveTasksProviders: Provider[] = [
  AllActiveTasksResolver,
  AllActiveTasksUseCase,
];
