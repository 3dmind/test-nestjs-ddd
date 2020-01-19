import { Provider } from '@nestjs/common';
import { DiscardTaskResolver } from './discard-task.resolver';
import { DiscardTaskUseCase } from './discard-task.usecase';

export const discardTaskProviders: Provider[] = [
  DiscardTaskResolver,
  DiscardTaskUseCase,
];
