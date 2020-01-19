import { Injectable } from '@nestjs/common';
import { UniqueEntityId, UseCase } from '../../../../../core/domain';
import {
  Either,
  eitherLeft,
  eitherRight,
  GenericAppErrors,
  Result,
} from '../../../../../core/logic';
import { TaskDescription, TaskEntity, TaskId } from '../../domain';
import { TaskRepository } from '../../task.repository';
import { EditTaskDto } from './edit-task.dto';
import { EditTaskErrors } from './edit-task.errors';

type Response = Either<
  | EditTaskErrors.TaskDoesNotExist
  | GenericAppErrors.UnexpectedError
  | Result<string>,
  Result<TaskEntity>
>;

@Injectable()
export class EditTaskUseCase implements UseCase<EditTaskDto, Response> {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(dto: EditTaskDto): Promise<Response> {
    const taskId = TaskId.create(UniqueEntityId.create(dto.taskId));
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
      return eitherLeft(
        new GenericAppErrors.UnexpectedError(error),
      ) as Response;
    }
  }
}
