import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../core/infrastructure';
import { GenericAppError } from '../../../core/logic';
import { TaskDTO } from './task.dto';
import { TaskMapper } from './task.mapper';
import {
  ArchiveTaskDTO,
  ArchiveTaskErrors,
  ArchiveTaskUseCase,
} from './useCases/archiveTask';
import {
  DiscardTaskDTO,
  DiscardTaskErrors,
  DiscardTaskUseCase,
} from './useCases/discardTask';
import {
  EditTaskDTO,
  EditTaskErrors,
  EditTaskUseCase,
} from './useCases/editTask';
import { GetAllTasksUseCase } from './useCases/getAllTasks';
import { NoteTaskDTO, NoteTaskUseCase } from './useCases/noteTask';
import {
  ResumeTaskDTO,
  ResumeTaskErrors,
  ResumeTaskUseCase,
} from './useCases/resumeTask';
import {
  TickOffTaskDTO,
  TickOffTaskErrors,
  TickOffTaskUseCase,
} from './useCases/tickOffTask';

@Resolver('Task')
export class TaskResolver extends BaseResolver {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly noteTaskUseCase: NoteTaskUseCase,
    private readonly getAllTasksUseCase: GetAllTasksUseCase,
    private readonly editTaskUseCase: EditTaskUseCase,
    private readonly tickOffTaskUseCase: TickOffTaskUseCase,
    private readonly resumeTaskUseCase: ResumeTaskUseCase,
    private readonly discardTaskUseCase: DiscardTaskUseCase,
    private readonly archiveTaskUseCase: ArchiveTaskUseCase,
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

  @Mutation()
  async resumeTask(@Args('input') args: ResumeTaskDTO): Promise<TaskDTO> {
    const response = await this.resumeTaskUseCase.execute(args);
    if (response.isLeft()) {
      const result = response.result;
      if (result instanceof ResumeTaskErrors.TaskDoesNotExist) {
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

  @Mutation()
  async archiveTask(@Args('input') args: ArchiveTaskDTO): Promise<TaskDTO> {
    const response = await this.archiveTaskUseCase.execute(args);
    if (response.isLeft()) {
      const result = response.result;
      if (result instanceof ArchiveTaskErrors.TaskDoesNotExist) {
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

  @Mutation()
  async discardTask(@Args('input') args: DiscardTaskDTO): Promise<TaskDTO> {
    const response = await this.discardTaskUseCase.execute(args);
    if (response.isLeft()) {
      const result = response.result;
      if (result instanceof DiscardTaskErrors.TaskDoesNotExist) {
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
