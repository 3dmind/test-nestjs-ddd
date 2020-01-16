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
import { TickOffTaskDTO } from './tickOffTask.dto';
import { TickOffTaskErrors } from './tickOffTask.errors';

type Response = Either<
  TickOffTaskErrors.TaskDoesNotExist | GenericAppError.UnexpectedError,
  Result<TaskEntity>
>;

@Injectable()
export class TickOffTaskUseCase implements UseCase<TickOffTaskDTO, Response> {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(dto: TickOffTaskDTO): Promise<Response> {
    const taskId = TaskId.create(UniqueEntityID.create(dto.taskId));
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
      return eitherLeft(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
}
