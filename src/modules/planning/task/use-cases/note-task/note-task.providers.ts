import { Provider } from '@nestjs/common';
import { NoteTaskResolver } from './note-task.resolver';
import { NoteTaskUseCase } from './note-task.usecase';

export const noteTaskProviders: Provider[] = [
  NoteTaskResolver,
  NoteTaskUseCase,
];
