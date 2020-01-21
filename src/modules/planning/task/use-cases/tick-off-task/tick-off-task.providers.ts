import { Provider } from '@nestjs/common';
import { TickOffTaskResolver } from './tick-off-task.resolver';
import { TickOffTaskUseCase } from './tick-off-task.usecase';

export const tickOffTaskProviders: Provider[] = [
  TickOffTaskResolver,
  TickOffTaskUseCase,
];
