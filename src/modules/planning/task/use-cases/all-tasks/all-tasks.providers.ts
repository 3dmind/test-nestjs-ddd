import { Provider } from '@nestjs/common';
import { AllTasksResolver } from './all-tasks.resolver';
import { AllTasksUseCase } from './all-tasks.usecase';

export const allTasksProviders: Provider[] = [
  AllTasksResolver,
  AllTasksUseCase,
];
