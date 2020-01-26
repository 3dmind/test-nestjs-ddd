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
  tasks: Task[];
}

type Response = Either<GenericAppErrors.UnexpectedError, Result<UseCaseResult>>;

@Injectable()
export class AllTasksUseCase implements UseCase<void, Response> {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(): Promise<Response> {
    try {
      const { count, tasks } = await this.taskRepository.findAndCountAllTasks();
      return eitherRight(
        Result.ok<UseCaseResult>({ count, tasks }),
      );
    } catch (error) {
      return eitherLeft(new GenericAppErrors.UnexpectedError(error));
    }
  }
}
