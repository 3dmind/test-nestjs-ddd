import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../core/domain';
import {
  Either,
  eitherLeft,
  eitherRight,
  GenericAppError,
  Result,
} from '../../../../core/logic';
import { TaskEntity } from '../domain';
import { TaskRepository } from '../task.repository';

type Response = Either<GenericAppError.UnexpectedError, Result<TaskEntity[]>>;

@Injectable()
export class GetAllTasksUseCase implements UseCase<void, Response> {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(): Promise<Response> {
    try {
      const taskEntities = await this.taskRepository.findAllTasks();
      return eitherRight(Result.ok(taskEntities));
    } catch (error) {
      return eitherLeft(new GenericAppError.UnexpectedError(error));
    }
  }
}
