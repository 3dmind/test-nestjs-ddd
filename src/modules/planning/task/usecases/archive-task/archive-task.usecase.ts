import { Injectable } from '@nestjs/common';
import { UniqueEntityId, UseCase } from '../../../../../core/domain';
import {
  Either,
  eitherLeft,
  eitherRight,
  GenericAppErrors,
  Result,
} from '../../../../../core/logic';
import { Task, TaskId } from '../../domain';
import { TaskRepository } from '../../task.repository';
import { ArchiveTaskDto } from './archive-task.dto';
import { ArchiveTaskErrors } from './archive-task.errors';

type Response = Either<
  ArchiveTaskErrors.TaskDoesNotExist | GenericAppErrors.UnexpectedError,
  Result<Task>
>;

@Injectable()
export class ArchiveTaskUseCase implements UseCase<ArchiveTaskDto, Response> {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(dto: ArchiveTaskDto): Promise<Response> {
    const taskId = TaskId.create(UniqueEntityId.create(dto.taskId));
    try {
      const [found, taskEntity] = await this.taskRepository.findByTaskId(
        taskId,
      );
      if (!found) {
        return eitherLeft(
          new ArchiveTaskErrors.TaskDoesNotExist(taskId),
        ) as Response;
      }
      taskEntity.archive();
      await this.taskRepository.save(taskEntity);
      return eitherRight(Result.ok(taskEntity)) as Response;
    } catch (error) {
      return eitherLeft(
        new GenericAppErrors.UnexpectedError(error),
      ) as Response;
    }
  }
}
