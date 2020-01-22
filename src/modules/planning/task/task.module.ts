import { Module } from '@nestjs/common';
import { taskProviders } from './task.providers';
import { activeTasksProviders } from './use-cases/active-tasks';
import { allTasksProviders } from './use-cases/all-tasks';
import { archiveTaskProviders } from './use-cases/archive-task';
import { archivedTasksProviders } from './use-cases/archived-tasks';
import { discardTaskProviders } from './use-cases/discard-task';
import { editTaskProviders } from './use-cases/edit-task';
import { noteTaskProviders } from './use-cases/note-task';
import { resumeTaskProviders } from './use-cases/resume-task';
import { tickOffTaskProviders } from './use-cases/tick-off-task';

@Module({
  providers: [
    ...taskProviders,
    ...activeTasksProviders,
    ...allTasksProviders,
    ...archiveTaskProviders,
    ...archivedTasksProviders,
    ...discardTaskProviders,
    ...editTaskProviders,
    ...noteTaskProviders,
    ...resumeTaskProviders,
    ...tickOffTaskProviders,
  ],
})
export class TaskModule {}
