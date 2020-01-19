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
import { ResumeTaskDto } from './resume-task.dto';
import { ResumeTaskErrors } from './resume-task.errors';

type Response = Either<
  ResumeTaskErrors.TaskDoesNotExist | GenericAppErrors.UnexpectedError,
  Result<Task>
>;

@Injectable()
export class ResumeTaskUseCase implements UseCase<ResumeTaskDto, Response> {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(dto: ResumeTaskDto): Promise<Response> {
    const taskId = TaskId.create(UniqueEntityId.create(dto.taskId));

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
      return eitherLeft(
        new GenericAppErrors.UnexpectedError(error),
      ) as Response;
    }
  }
}
