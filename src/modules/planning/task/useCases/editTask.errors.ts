import { UniqueEntityID } from '../../../../core/domain';
import { Result } from '../../../../core/logic';
import { UseCaseError } from '../../../../core/logic/UseCaseError';

export namespace EditTaskErrors {
  export class TaskDoesNotExist extends Result<UseCaseError> {
    constructor(taskId: UniqueEntityID) {
      super(false, {
        message: `The task with ID ${taskId.value} does not exist.`,
      });
    }
  }
}
