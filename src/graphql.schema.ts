
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class EditTaskDTO {
    taskId: string;
    text: string;
}

export class NoteTaskDTO {
    text: string;
}

export class ResumeTaskDTO {
    taskId: string;
}

export class TickOffTaskDTO {
    taskId: string;
}

export abstract class IMutation {
    abstract noteTask(input: NoteTaskDTO): TaskDTO | Promise<TaskDTO>;

    abstract editTask(input: EditTaskDTO): TaskDTO | Promise<TaskDTO>;

    abstract tickOffTask(input?: TickOffTaskDTO): TaskDTO | Promise<TaskDTO>;

    abstract resumeTask(input?: ResumeTaskDTO): TaskDTO | Promise<TaskDTO>;
}

export abstract class IQuery {
    abstract tasks(): TaskDTO[] | Promise<TaskDTO[]>;
}

export class TaskDTO {
    taskId: string;
    description: string;
    createdAt: string;
    isTickedOff: boolean;
    tickedOffAt?: string;
    resumedAt?: string;
    editedAt?: string;
    isArchived: boolean;
    archivedAt?: string;
}
