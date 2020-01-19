import { Module } from '@nestjs/common';
import { taskProviders } from './task.providers';

@Module({
  providers: [...taskProviders],
})
export class TaskModule {}
