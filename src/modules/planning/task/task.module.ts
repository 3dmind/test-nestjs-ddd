import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { TaskMapper } from './task.mapper';
import { taskProviders } from './task.providers';
import { TaskRepository } from './task.repository';
import { TaskResolver } from './task.resolver';
import { EditTaskUseCase } from './useCases/editTask.useCase';
import { GetAllTasksUseCase } from './useCases/getAllTasks.useCase';
import { NoteTaskUseCase } from './useCases/noteTask.useCase';
import { TickOffTaskUseCase } from './useCases/tickOffTask.useCase';

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
