import { Provider } from '@nestjs/common';
import { ArchiveTaskResolver } from './archive-task.resolver';
import { ArchiveTaskUseCase } from './archive-task.use-case';

export const archiveTaskProviders: Provider[] = [
  ArchiveTaskResolver,
  ArchiveTaskUseCase,
];
