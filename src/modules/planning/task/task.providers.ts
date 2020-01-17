import { Provider } from '@nestjs/common';
import { TaskMapper } from './task.mapper';
import { TaskModel } from './task.model';
import { TaskRepository } from './task.repository';
import { TaskResolver } from './task.resolver';
import { DiscardTaskUseCase } from './useCases/discardTask';
import { EditTaskUseCase } from './useCases/editTask';
import { GetAllTasksUseCase } from './useCases/getAllTasks';
import { NoteTaskUseCase } from './useCases/noteTask';
import { ResumeTaskUseCase } from './useCases/resumeTask';
import { TickOffTaskUseCase } from './useCases/tickOffTask';

export const taskProviders: Provider[] = [
  {
    provide: 'TASK_MODEL',
    useValue: TaskModel,
  },
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
