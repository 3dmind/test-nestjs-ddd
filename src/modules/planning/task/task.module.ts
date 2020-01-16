import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { TaskMapper } from './task.mapper';
import { taskProviders } from './task.providers';
import { TaskRepository } from './task.repository';
import { TaskResolver } from './task.resolver';
import { EditTaskUseCase } from './useCases/editTask';
import { GetAllTasksUseCase } from './useCases/getAllTasks';
import { NoteTaskUseCase } from './useCases/noteTask';
import { TickOffTaskUseCase } from './useCases/tickOffTask';

@Module({
  imports: [DatabaseModule],
  providers: [
    EditTaskUseCase,
    GetAllTasksUseCase,
    NoteTaskUseCase,
    TickOffTaskUseCase,
    TaskResolver,
    TaskMapper,
    TaskRepository,
    ...taskProviders,
  ],
})
export class TaskModule {}
