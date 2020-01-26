import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../../../core/infrastructure';
import { GenericAppErrors } from '../../../../../core/logic';
import { TaskDto } from '../../task.dto';
import { TaskMapper } from '../../task.mapper';
import { TickOffTaskDto } from './tick-off-task.dto';
import { TickOffTaskErrors } from './tick-off-task.errors';
import { TickOffTaskUseCase } from './tick-off-task.usecase';

@Resolver((of) => TaskDto)
export class TickOffTaskResolver extends BaseResolver {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly tickOffTaskUseCase: TickOffTaskUseCase,
  ) {
    super();
  }

  @Mutation((returns) => TaskDto)
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
}
