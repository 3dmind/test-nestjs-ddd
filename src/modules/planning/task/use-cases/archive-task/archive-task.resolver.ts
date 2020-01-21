import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../../../core/infrastructure';
import { GenericAppErrors } from '../../../../../core/logic';
import { TaskDto } from '../../task.dto';
import { TaskMapper } from '../../task.mapper';
import { ArchiveTaskDto } from './archive-task.dto';
import { ArchiveTaskErrors } from './archive-task.errors';
import { ArchiveTaskUseCase } from './archive-task.usecase';

@Resolver()
export class ArchiveTaskResolver extends BaseResolver {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly archiveTaskUseCase: ArchiveTaskUseCase,
  ) {
    super();
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
}
