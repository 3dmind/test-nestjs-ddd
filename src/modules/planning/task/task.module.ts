import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { TaskMapper } from './task.mapper';
import { taskProviders } from './task.providers';
import { TaskRepository } from './task.repository';
import { TaskResolver } from './task.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [TaskResolver, TaskMapper, TaskRepository, ...taskProviders],
})
export class TaskModule {}
