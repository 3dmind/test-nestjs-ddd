import { Provider } from '@nestjs/common';
import { DiscardTaskResolver } from './discard-task.resolver';
import { DiscardTaskUseCase } from './discard-task.use-case';

export const discardTaskProviders: Provider[] = [
  DiscardTaskResolver,
  DiscardTaskUseCase,
];
