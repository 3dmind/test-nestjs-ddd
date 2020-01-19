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
import { TickOffTaskDto } from './tick-off-task.dto';
import { TickOffTaskErrors } from './tick-off-task.errors';

type Response = Either<
  TickOffTaskErrors.TaskDoesNotExist | GenericAppErrors.UnexpectedError,
  Result<TaskEntity>
>;

@Injectable()
export class TickOffTaskUseCase implements UseCase<TickOffTaskDto, Response> {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(dto: TickOffTaskDto): Promise<Response> {
    const taskId = TaskId.create(UniqueEntityId.create(dto.taskId));
    try {
      const [found, taskEntity] = await this.taskRepository.findByTaskId(
        taskId,
      );
      if (!found) {
        return eitherLeft(
          new TickOffTaskErrors.TaskDoesNotExist(taskId),
        ) as Response;
      }
      taskEntity.tickOff();
      await this.taskRepository.save(taskEntity);
      return eitherRight(Result.ok(taskEntity)) as Response;
    } catch (error) {
      return eitherLeft(
        new GenericAppErrors.UnexpectedError(error),
      ) as Response;
    }
  }
}
