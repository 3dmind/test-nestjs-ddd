
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class NoteTaskInput {
    text: string;
}

export abstract class IMutation {
    abstract noteTask(noteTaskInput: NoteTaskInput): Task | Promise<Task>;
}

export abstract class IQuery {
    abstract getTasks(): Task[] | Promise<Task[]>;
}

export class Task {
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
