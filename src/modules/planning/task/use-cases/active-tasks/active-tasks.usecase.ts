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
  activeTasks: Task[];
}

type Response = Either<GenericAppErrors.UnexpectedError, Result<UseCaseResult>>;

@Injectable()
export class ActiveTasksUseCase implements UseCase<void, Response> {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(): Promise<Response> {
    try {
      const {
        count,
        activeTasks,
      } = await this.taskRepository.findAndCountActiveTasks();
      return eitherRight(
        Result.ok<UseCaseResult>({ count, activeTasks }),
      );
    } catch (error) {
      return eitherLeft(new GenericAppErrors.UnexpectedError(error));
    }
  }
}
