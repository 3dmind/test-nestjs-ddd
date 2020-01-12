import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain';
import {
  Either,
  eitherLeft,
  eitherRight,
  GenericAppError,
  Result,
} from '../../../../../core/logic';
import { TaskDescription, TaskEntity } from '../../domain';
import { TaskRepository } from '../../task.repository';
import { NoteTaskDTO } from './NoteTaskDTO';

type Response = Either<
  GenericAppError.UnexpectedError | Result<string>,
  Result<TaskEntity>
>;

@Injectable()
export class NoteTaskUseCase implements UseCase<NoteTaskDTO, Response> {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(dto: NoteTaskDTO): Promise<Response> {
    const { text } = dto;
    const taskDescriptionOrError = TaskDescription.create(text);

    if (taskDescriptionOrError.isFailure) {
      return eitherLeft(
        Result.fail<string>(taskDescriptionOrError.error),
      ) as Response;
    }

    const taskEntity = TaskEntity.note(taskDescriptionOrError.value);
    try {
      await this.taskRepository.save(taskEntity);
    } catch (error) {
      return eitherLeft(new GenericAppError.UnexpectedError(error)) as Response;
    }
    return eitherRight(Result.ok(taskEntity)) as Response;
  }
}
