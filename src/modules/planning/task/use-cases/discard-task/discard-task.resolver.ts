import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../../../core/infrastructure';
import { GenericAppErrors } from '../../../../../core/logic';
import { TaskDto } from '../../task.dto';
import { TaskMapper } from '../../task.mapper';
import { DiscardTaskDto } from './discar-task.dto';
import { DiscardTaskErrors } from './discard-task.errors';
import { DiscardTaskUseCase } from './discard-task.usecase';

@Resolver((of) => TaskDto)
export class DiscardTaskResolver extends BaseResolver {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly discardTaskUseCase: DiscardTaskUseCase,
  ) {
    super();
  }

  @Mutation((returns) => TaskDto)
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
