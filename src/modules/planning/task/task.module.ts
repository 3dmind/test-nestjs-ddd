import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { taskProviders } from './task.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...taskProviders],
})
export class TaskModule {}
