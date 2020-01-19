import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../core/infrastructure';
import { GenericAppErrors } from '../../../core/logic';
import { TaskDto } from './task.dto';
import { TaskMapper } from './task.mapper';
import {
  ArchiveTaskDto,
  ArchiveTaskErrors,
  ArchiveTaskUseCase,
} from './usecases/archive-task';
import {
  DiscardTaskDto,
  DiscardTaskErrors,
  DiscardTaskUseCase,
} from './usecases/discard-task';
import {
  EditTaskDto,
  EditTaskErrors,
  EditTaskUseCase,
} from './usecases/edit-task';
import { GetAllTasksUseCase } from './usecases/get-all-tasks';
import { NoteTaskDto, NoteTaskUseCase } from './usecases/note-task';
import {
  ResumeTaskDto,
  ResumeTaskErrors,
  ResumeTaskUseCase,
} from './usecases/resume-task';
import {
  TickOffTaskDto,
  TickOffTaskErrors,
  TickOffTaskUseCase,
} from './usecases/tick-off-task';

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
  public async tasks(): Promise<TaskDto[]> {
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
  public async noteTask(@Args('input') args: NoteTaskDto): Promise<TaskDto> {
    const response = await this.noteTaskUseCase.execute(args);
    if (response.isLeft()) {
      const result = response.result;
      if (result instanceof GenericAppErrors.UnexpectedError) {
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
  public async editTask(@Args('input') args: EditTaskDto): Promise<TaskDto> {
    const response = await this.editTaskUseCase.execute(args);
    if (response.isLeft()) {
      const result = response.result;
      if (result instanceof EditTaskErrors.TaskDoesNotExist) {
        this.fail(result.error.message);
      } else if (result instanceof GenericAppErrors.UnexpectedError) {
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
  public async tickOffTask(
    @Args('input') args: TickOffTaskDto,
  ): Promise<TaskDto> {
    const response = await this.tickOffTaskUseCase.execute(args);
    if (response.isLeft()) {
      const result = response.result;
      if (result instanceof TickOffTaskErrors.TaskDoesNotExist) {
        this.fail(result.error.message);
      }
      if (result instanceof GenericAppErrors.UnexpectedError) {
        this.fail(result.error.message);
      }
    }

    if (response.isRight()) {
      return this.taskMapper.toDTO(response.result.value);
    }
  }

  @Mutation()
  public async resumeTask(
    @Args('input') args: ResumeTaskDto,
  ): Promise<TaskDto> {
    const response = await this.resumeTaskUseCase.execute(args);
    if (response.isLeft()) {
      const result = response.result;
      if (result instanceof ResumeTaskErrors.TaskDoesNotExist) {
        this.fail(result.error.message);
      }
      if (result instanceof GenericAppErrors.UnexpectedError) {
        this.fail(result.error.message);
      }
    }

    if (response.isRight()) {
      return this.taskMapper.toDTO(response.result.value);
    }
  }

  @Mutation()
  public async archiveTask(
    @Args('input') args: ArchiveTaskDto,
  ): Promise<TaskDto> {
    const response = await this.archiveTaskUseCase.execute(args);
    if (response.isLeft()) {
      const result = response.result;
      if (result instanceof ArchiveTaskErrors.TaskDoesNotExist) {
        this.fail(result.error.message);
      }
      if (result instanceof GenericAppErrors.UnexpectedError) {
        this.fail(result.error.message);
      }
    }

    if (response.isRight()) {
      return this.taskMapper.toDTO(response.result.value);
    }
  }

  @Mutation()
  public async discardTask(
    @Args('input') args: DiscardTaskDto,
  ): Promise<TaskDto> {
    const response = await this.discardTaskUseCase.execute(args);
    if (response.isLeft()) {
      const result = response.result;
      if (result instanceof DiscardTaskErrors.TaskDoesNotExist) {
        this.fail(result.error.message);
      }
      if (result instanceof GenericAppErrors.UnexpectedError) {
        this.fail(result.error.message);
      }
    }

    if (response.isRight()) {
      return this.taskMapper.toDTO(response.result.value);
    }
  }
}
