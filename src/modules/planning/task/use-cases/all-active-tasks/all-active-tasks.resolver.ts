import { Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../../../core/infrastructure';
import { TaskDto } from '../../task.dto';
import { TaskMapper } from '../../task.mapper';
import { AllActiveTasksDto } from './all-active-tasks.dto';
import { AllActiveTasksUseCase } from './all-active-tasks.use-case';

@Resolver(() => TaskDto)
export class AllActiveTasksResolver extends BaseResolver {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly getActiveTasksUseCase: AllActiveTasksUseCase,
  ) {
    super();
  }

  @Query(() => AllActiveTasksDto)
  public async allActiveTasks(): Promise<AllActiveTasksDto> {
    const response = await this.getActiveTasksUseCase.execute();
    if (response.isLeft()) {
      const result = response.result;
      this.fail(result.error.message);
    }
    if (response.isRight()) {
      const { count, activeTasks } = response.result.value;
      return {
        count,
        tasks: activeTasks.map((task) => this.taskMapper.toDTO(task)),
      };
    }
  }
}
