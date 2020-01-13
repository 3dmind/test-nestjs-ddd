import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../core/infrastructure';
import { GenericAppError } from '../../../core/logic';
import { NoteTaskDTO, TaskDTO } from '../../../graphql.schema';
import { TaskMapper } from './task.mapper';
import { GetAllTasksUseCase, NoteTaskUseCase } from './useCases';

@Resolver('Task')
export class TaskResolver extends BaseResolver {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly noteTaskUseCase: NoteTaskUseCase,
    private readonly getAllTasksUseCase: GetAllTasksUseCase,
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
}
