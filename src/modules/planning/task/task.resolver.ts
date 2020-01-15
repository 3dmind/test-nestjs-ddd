import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../core/infrastructure';
import { GenericAppError } from '../../../core/logic';
import {
  EditTaskDTO,
  NoteTaskDTO,
  TaskDTO,
  TickOffTaskDTO,
} from '../../../graphql.schema';
import { TaskMapper } from './task.mapper';
import { EditTaskUseCase } from './useCases/editTask.useCase';
import { EditTaskErrors } from './useCases/editTask.errors';
import { GetAllTasksUseCase } from './useCases/getAllTasks.useCase';
import { NoteTaskUseCase } from './useCases/noteTask.useCase';
import { TickOffTaskUseCase } from './useCases/tickOffTask.useCase';
import { TickOffTaskErrors } from './useCases/tickOffTask.errors';

@Resolver('Task')
export class TaskResolver extends BaseResolver {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly noteTaskUseCase: NoteTaskUseCase,
    private readonly getAllTasksUseCase: GetAllTasksUseCase,
    private readonly editTaskUseCase: EditTaskUseCase,
    private readonly tickOffTaskUseCase: TickOffTaskUseCase,
  ) {
    super();
  }

  @Query()
  async tasks(): Promise<TaskDTO[]> {
    const response = await this.getAllTasksUseCase.execute();
    if (response.isLeft()) {
      const result = response.result;
      this.fail(result.error.message);
    }
    if (response.isRight()) {
      const taskEntities = response.result.value;
      return taskEntities.map((taskEntity) =>
        this.taskMapper.toDTO(taskEntity),
      );
    }
  }

  @Mutation()
  async noteTask(@Args('input') args: NoteTaskDTO): Promise<TaskDTO> {
    const response = await this.noteTaskUseCase.execute(args);
    if (response.isLeft()) {
      const result = response.result;
      if (result instanceof GenericAppError.UnexpectedError) {
        this.fail(result.error.message);
      } else {
        this.fail(result.error);
      }
    }

    if (response.isRight()) {
      return this.taskMapper.toDTO(response.result.value);
    }
  }

  @Mutation()
  async editTask(@Args('input') args: EditTaskDTO): Promise<TaskDTO> {
    const response = await this.editTaskUseCase.execute(args);
    if (response.isLeft()) {
      const result = response.result;
      if (result instanceof EditTaskErrors.TaskDoesNotExist) {
        this.fail(result.error.message);
      } else if (result instanceof GenericAppError.UnexpectedError) {
        this.fail(result.error.message);
      } else {
        this.fail(result.error);
      }
    }

    if (response.isRight()) {
      return this.taskMapper.toDTO(response.result.value);
    }
  }

  @Mutation()
  async tickOffTask(@Args('input') args: TickOffTaskDTO): Promise<TaskDTO> {
    const response = await this.tickOffTaskUseCase.execute(args);
    if (response.isLeft()) {
      const result = response.result;
      if (result instanceof TickOffTaskErrors.TaskDoesNotExist) {
        this.fail(result.error.message);
      }
      if (result instanceof GenericAppError.UnexpectedError) {
        this.fail(result.error.message);
      }
    }

    if (response.isRight()) {
      return this.taskMapper.toDTO(response.result.value);
    }
  }
}
