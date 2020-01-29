import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain';
import {
  Either,
  eitherLeft,
  eitherRight,
  GenericAppErrors,
  Result,
} from '../../../../../core/logic';
import { Task } from '../../domain';
import { TaskRepository } from '../../task.repository';
import { ArchivedTasksUseCase } from '../archived-tasks/archived-tasks.usecase';
import { DiscardAllArchivedTasksErrors } from './discard-all-archived-tasks.errors';

interface UseCaseResult {
  count: number;
  discardedTasks: Task[];
}

type Response = Either<
  | DiscardAllArchivedTasksErrors.TaskNotDiscardedError
  | GenericAppErrors.UnexpectedError,
  Result<UseCaseResult>
>;

@Injectable()
export class DiscardAllArchivedTasksUseCase implements UseCase<void, Response> {
  constructor(
    private readonly archivedTasksUseCase: ArchivedTasksUseCase,
    private readonly taskRepository: TaskRepository,
  ) {}

  public async execute(): Promise<Response> {
    const response = await this.archivedTasksUseCase.execute();
    if (response.isLeft()) {
      return eitherLeft(response.result);
    }

    if (response.isRight()) {
      try {
        const { count, archivedTasks: tasks } = response.result.value;
        tasks.forEach((task) => task.discard());
        if (tasks.some((task) => !task.isDiscarded())) {
          return eitherLeft(
            new DiscardAllArchivedTasksErrors.TaskNotDiscardedError(),
          );
        }

        for (const task of tasks) {
          await this.taskRepository.save(task);
        }

        return eitherRight(
          Result.ok<UseCaseResult>({
            count,
            discardedTasks: tasks,
          }),
        );
      } catch (error) {
        return eitherLeft(new GenericAppErrors.UnexpectedError(error));
      }
    }
  }
}
