import { Result, UseCaseError } from '../../../../../core/logic';

export namespace DiscardAllArchivedTasksErrors {
  export class TaskNotDiscardedError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Task could not be discarded.`,
      });
    }
  }
}
