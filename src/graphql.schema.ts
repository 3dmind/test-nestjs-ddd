
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class ArchiveTaskDto {
    taskId: string;
}

export class DiscardTaskDto {
    taskId: string;
}

export class EditTaskDto {
    taskId: string;
    text: string;
}

export class NoteTaskDto {
    text: string;
}

export class ResumeTaskDto {
    taskId: string;
}

export class TickOffTaskDto {
    taskId: string;
}

export abstract class IMutation {
    abstract noteTask(input: NoteTaskDto): TaskDto | Promise<TaskDto>;

    abstract editTask(input: EditTaskDto): TaskDto | Promise<TaskDto>;

    abstract tickOffTask(input?: TickOffTaskDto): TaskDto | Promise<TaskDto>;

    abstract resumeTask(input?: ResumeTaskDto): TaskDto | Promise<TaskDto>;

    abstract archiveTask(input?: ArchiveTaskDto): TaskDto | Promise<TaskDto>;

    abstract discardTask(input?: DiscardTaskDto): TaskDto | Promise<TaskDto>;
}

export abstract class IQuery {
    abstract tasks(): TaskDto[] | Promise<TaskDto[]>;
}

export class TaskDto {
    taskId: string;
    description: string;
    createdAt: string;
    isTickedOff: boolean;
    tickedOffAt?: string;
    resumedAt?: string;
    editedAt?: string;
    isArchived: boolean;
    archivedAt?: string;
    isDiscarded: boolean;
    discardedAt?: string;
}
