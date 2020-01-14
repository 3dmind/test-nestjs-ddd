import { Injectable } from '@nestjs/common';
import { UniqueEntityID, UseCase } from '../../../../core/domain';
import {
  Either,
  eitherLeft,
  eitherRight,
  GenericAppError,
  Result,
} from '../../../../core/logic';
import { EditTaskDTO } from '../../../../graphql.schema';
import { TaskDescription, TaskEntity } from '../domain';
import { TaskRepository } from '../task.repository';
import { EditTaskErrors } from './editTask.errors';

type Response = Either<
  | EditTaskErrors.TaskDoesNotExist
  | GenericAppError.UnexpectedError
  | Result<string>,
  Result<TaskEntity>
>;

@Injectable()
export class EditTaskUseCase implements UseCase<EditTaskDTO, Response> {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(dto: EditTaskDTO): Promise<Response> {
    const taskId = UniqueEntityID.create(dto.taskId);
    try {
      const [found, taskEntity] = await this.taskRepository.findByTaskId(
        taskId,
      );
      if (!found) {
        return eitherLeft(
          new EditTaskErrors.TaskDoesNotExist(taskId),
        ) as Response;
      }

      const taskDescriptionOrError = TaskDescription.create(dto.text);
      if (taskDescriptionOrError.isFailure) {
        return eitherLeft(
          Result.fail<string>(taskDescriptionOrError.error),
        ) as Response;
      }

      const taskDescription = taskDescriptionOrError.value;
      taskEntity.edit(taskDescription);
      await this.taskRepository.save(taskEntity);
      return eitherRight(Result.ok(taskEntity)) as Response;
    } catch (error) {
      return eitherLeft(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
}
