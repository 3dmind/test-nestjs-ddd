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
import { ArchiveTaskDTO } from './archiveTask.dto';
import { ArchiveTaskErrors } from './archiveTask.errors';

type Response = Either<
  ArchiveTaskErrors.TaskDoesNotExist | GenericAppError.UnexpectedError,
  Result<TaskEntity>
>;

@Injectable()
export class ArchiveTaskUseCase implements UseCase<ArchiveTaskDTO, Response> {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(dto: ArchiveTaskDTO): Promise<Response> {
    const taskId = TaskId.create(UniqueEntityID.create(dto.taskId));
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
      return eitherLeft(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
}
