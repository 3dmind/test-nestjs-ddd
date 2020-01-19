import { Provider } from '@nestjs/common';
import { ArchiveTaskResolver } from './archive-task.resolver';
import { ArchiveTaskUseCase } from './archive-task.usecase';

export const archiveTaskProviders: Provider[] = [
  ArchiveTaskResolver,
  ArchiveTaskUseCase,
];
