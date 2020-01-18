import { Result } from '../../../../../core/logic';
import { UseCaseError } from '../../../../../core/logic/UseCaseError';
import { TaskId } from '../../domain';

export namespace ArchiveTaskErrors {
  export class TaskDoesNotExist extends Result<UseCaseError> {
    constructor(taskId: TaskId) {
      super(false, {
        message: `The task with ID ${taskId.id.value} does not exist.`,
      });
    }
  }
}
