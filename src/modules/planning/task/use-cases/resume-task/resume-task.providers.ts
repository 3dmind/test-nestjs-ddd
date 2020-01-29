import { Provider } from '@nestjs/common';
import { ResumeTaskResolver } from './resume-task.resolver';
import { ResumeTaskUseCase } from './resume-task.use-case';

export const resumeTaskProviders: Provider[] = [
  ResumeTaskResolver,
  ResumeTaskUseCase,
];
