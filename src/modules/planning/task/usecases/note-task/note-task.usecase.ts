import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain';
import {
  Either,
  eitherLeft,
  eitherRight,
  GenericAppErrors,
  Result,
} from '../../../../../core/logic';
import { Description, Task } from '../../domain';
import { TaskRepository } from '../../task.repository';
import { NoteTaskDto } from './note-task.dto';

type Response = Either<
  GenericAppErrors.UnexpectedError | Result<string>,
  Result<Task>
>;

@Injectable()
export class NoteTaskUseCase implements UseCase<NoteTaskDto, Response> {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(dto: NoteTaskDto): Promise<Response> {
    const { text } = dto;
    const taskDescriptionOrError = Description.create(text);

    if (taskDescriptionOrError.isFailure) {
      return eitherLeft(
        Result.fail<string>(taskDescriptionOrError.error),
      ) as Response;
    }

    const taskEntity = Task.note(taskDescriptionOrError.value);
    try {
      await this.taskRepository.save(taskEntity);
    } catch (error) {
      return eitherLeft(
        new GenericAppErrors.UnexpectedError(error),
      ) as Response;
    }
    return eitherRight(Result.ok(taskEntity)) as Response;
  }
}
