import { Injectable } from '@nestjs/common';
import { UniqueEntityID, UseCase } from '../../../../../core/domain';
import {
  Either,
  eitherLeft,
  eitherRight,
  GenericAppError,
  Result,
} from '../../../../../core/logic';
import { TaskEntity, TaskId } from '../../domain';
import { TaskRepository } from '../../task.repository';
import { DiscardTaskDTO } from './discardTask.dto';
import { DiscardTaskErrors } from './discardTask.errors';

type Response = Either<GenericAppError.UnexpectedError, Result<TaskEntity>>;

@Injectable()
export class DiscardTaskUseCase implements UseCase<DiscardTaskDTO, Response> {
  constructor(private readonly taskRepository: TaskRepository) {}
  public async execute(dto: DiscardTaskDTO): Promise<Response> {
    const taskId = TaskId.create(UniqueEntityID.create(dto.taskId));
    try {
      const [found, taskEntity] = await this.taskRepository.findByTaskId(
        taskId,
      );
      if (!found) {
        return eitherLeft(
          new DiscardTaskErrors.TaskDoesNotExist(taskId),
        ) as Response;
      }
      taskEntity.discard();
      await this.taskRepository.save(taskEntity);
      return eitherRight(Result.ok(taskEntity)) as Response;
    } catch (error) {
      return eitherLeft(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
}
