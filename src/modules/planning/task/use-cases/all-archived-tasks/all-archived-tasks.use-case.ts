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

interface UseCaseResult {
  count: number;
  archivedTasks: Task[];
}

type Response = Either<GenericAppErrors.UnexpectedError, Result<UseCaseResult>>;

@Injectable()
export class AllArchivedTasksUseCase implements UseCase<void, Response> {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(): Promise<Response> {
    try {
      const {
        count,
        archivedTasks,
      } = await this.taskRepository.findAndCountArchivedTasks();
      return eitherRight(
        Result.ok<UseCaseResult>({ count, archivedTasks }),
      );
    } catch (error) {
      return eitherLeft(new GenericAppErrors.UnexpectedError(error));
    }
  }
}
