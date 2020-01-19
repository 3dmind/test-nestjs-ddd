import { Provider } from '@nestjs/common';
import { TASK_MODEL_INJECTION_TOKEN } from './constants';
import { TaskMapper } from './task.mapper';
import { TaskModel } from './task.model';
import { TaskRepository } from './task.repository';
import { TaskResolver } from './task.resolver';
import { ArchiveTaskUseCase } from './usecases/archive-task';
import { DiscardTaskUseCase } from './usecases/discard-task';
import { EditTaskUseCase } from './usecases/edit-task';
import { GetAllTasksUseCase } from './usecases/get-all-tasks';
import { NoteTaskUseCase } from './usecases/note-task';
import { ResumeTaskUseCase } from './usecases/resume-task';
import { TickOffTaskUseCase } from './usecases/tick-off-task';

export const taskProviders: Provider[] = [
  {
    provide: TASK_MODEL_INJECTION_TOKEN,
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
