import { Provider } from '@nestjs/common';
import { TaskMapper } from './task.mapper';
import { TaskModel } from './task.model';
import { TaskRepository } from './task.repository';
import { TaskResolver } from './task.resolver';
import { DiscardTaskUseCase } from './usecases/discard-task';
import { EditTaskUseCase } from './usecases/edit-task';
import { GetAllTasksUseCase } from './usecases/get-all-tasks';
import { NoteTaskUseCase } from './usecases/note-task';
import { ResumeTaskUseCase } from './usecases/resume-task';
import { TickOffTaskUseCase } from './usecases/tick-off-task';
import { ArchiveTaskUseCase } from './usecases/archive-task';

export const taskProviders: Provider[] = [
  {
    provide: 'TASK_MODEL',
    useValue: TaskModel,
  },
  ArchiveTaskUseCase,
  DiscardTaskUseCase,
  EditTaskUseCase,
  GetAllTasksUseCase,
  NoteTaskUseCase,
  ResumeTaskUseCase,
  TaskMapper,
  TaskRepository,
  TaskResolver,
  TickOffTaskUseCase,
];
