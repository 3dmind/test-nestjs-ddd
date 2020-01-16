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
import { ResumeTaskDTO } from './resumeTask.dto';
import { ResumeTaskErrors } from './resumeTask.errors';

type Response = Either<ResumeTaskErrors.TaskDoesNotExist | GenericAppError.UnexpectedError,
  Result<TaskEntity>>;

@Injectable()
export class ResumeTaskUseCase implements UseCase<ResumeTaskDTO, Response> {
  constructor(private readonly taskRepository: TaskRepository) {
  }

  public async execute(dto: ResumeTaskDTO): Promise<Response> {
    const taskId = TaskId.create(UniqueEntityID.create(dto.taskId));

    try {
      const [found, taskEntity] = await this.taskRepository.findByTaskId(
        taskId,
      );
      if (!found) {
        return eitherLeft(
          new ResumeTaskErrors.TaskDoesNotExist(taskId),
        ) as Response;
      }
      taskEntity.resume();
      await this.taskRepository.save(taskEntity);
      return eitherRight(Result.ok(taskEntity)) as Response;
    } catch (error) {
      return eitherLeft(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
}
