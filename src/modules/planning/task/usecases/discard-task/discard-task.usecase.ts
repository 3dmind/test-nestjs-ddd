import { Injectable } from '@nestjs/common';
import { UniqueEntityId, UseCase } from '../../../../../core/domain';
import {
  Either,
  eitherLeft,
  eitherRight,
  GenericAppErrors,
  Result,
} from '../../../../../core/logic';
import { TaskEntity, TaskId } from '../../domain';
import { TaskRepository } from '../../task.repository';
import { DiscardTaskDto } from './discar-task.dto';
import { DiscardTaskErrors } from './discard-task.errors';

type Response = Either<GenericAppErrors.UnexpectedError, Result<TaskEntity>>;

@Injectable()
export class DiscardTaskUseCase implements UseCase<DiscardTaskDto, Response> {
  constructor(private readonly taskRepository: TaskRepository) {}
  public async execute(dto: DiscardTaskDto): Promise<Response> {
    const taskId = TaskId.create(UniqueEntityId.create(dto.taskId));
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
      return eitherLeft(
        new GenericAppErrors.UnexpectedError(error),
      ) as Response;
    }
  }
}
