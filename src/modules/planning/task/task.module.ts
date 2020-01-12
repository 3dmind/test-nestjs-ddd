import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { TaskMapper } from './task.mapper';
import { taskProviders } from './task.providers';
import { TaskRepository } from './task.repository';
import { TaskResolver } from './task.resolver';
import { GetAllTasksUseCase, NoteTaskUseCase } from './useCases';

@Module({
  imports: [DatabaseModule],
  providers: [
    GetAllTasksUseCase,
    NoteTaskUseCase,
    TaskResolver,
    TaskMapper,
    TaskRepository,
    ...taskProviders,
  ],
})
export class TaskModule {}
