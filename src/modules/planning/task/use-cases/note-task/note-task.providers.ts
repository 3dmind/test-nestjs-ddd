import { Provider } from '@nestjs/common';
import { NoteTaskResolver } from './note-task.resolver';
import { NoteTaskUseCase } from './note-task.use-case';

export const noteTaskProviders: Provider[] = [
  NoteTaskResolver,
  NoteTaskUseCase,
];
