import { Mutation, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../../../core/infrastructure';
import { TaskDto } from '../../task.dto';
import { TaskMapper } from '../../task.mapper';
import { DiscardAllArchivedTasksDto } from './discard-all-archived-tasks.dto';
import { DiscardAllArchivedTasksUseCase } from './discard-all-archived-tasks.use-case';

@Resolver(() => TaskDto)
export class DiscardAllArchivedTasksResolver extends BaseResolver {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly discardAllArchivedTasksUseCase: DiscardAllArchivedTasksUseCase,
  ) {
    super();
  }

  @Mutation(() => DiscardAllArchivedTasksDto)
  public async discardAllArchivedTasks(): Promise<DiscardAllArchivedTasksDto> {
    const response = await this.discardAllArchivedTasksUseCase.execute();
    if (response.isLeft()) {
      const { result } = response;
      this.fail(result.error.message);
    }
    if (response.isRight()) {
      const { count, discardedTasks } = response.result.value;
      return {
        count,
        tasks: discardedTasks.map((task) => this.taskMapper.toDTO(task)),
      };
    }
  }
}
