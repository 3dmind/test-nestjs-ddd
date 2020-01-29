import { Module } from '@nestjs/common';
import { taskProviders } from './task.providers';
import { allActiveTasksProviders } from './use-cases/all-active-tasks';
import { allArchivedTasksProviders } from './use-cases/all-archived-tasks';
import { allTasksProviders } from './use-cases/all-tasks';
import { archiveTaskProviders } from './use-cases/archive-task';
import { discardAllArchivedTasksProviders } from './use-cases/discard-all-archived-tasks';
import { discardTaskProviders } from './use-cases/discard-task';
import { editTaskProviders } from './use-cases/edit-task';
import { noteTaskProviders } from './use-cases/note-task';
import { resumeTaskProviders } from './use-cases/resume-task';
import { tickOffTaskProviders } from './use-cases/tick-off-task';

@Module({
  providers: [
    ...taskProviders,
    ...allActiveTasksProviders,
    ...allArchivedTasksProviders,
    ...allTasksProviders,
    ...archiveTaskProviders,
    ...discardAllArchivedTasksProviders,
    ...discardTaskProviders,
    ...editTaskProviders,
    ...noteTaskProviders,
    ...resumeTaskProviders,
    ...tickOffTaskProviders,
  ],
})
export class TaskModule {}
