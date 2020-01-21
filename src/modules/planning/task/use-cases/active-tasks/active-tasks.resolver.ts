import { Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../../../core/infrastructure';
import { TaskMapper } from '../../task.mapper';
import { ActiveTasksDto } from './active-tasks.dto';
import { ActiveTasksUseCase } from './active-tasks.usecase';

@Resolver()
export class ActiveTasksResolver extends BaseResolver {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly getActiveTasksUseCase: ActiveTasksUseCase,
  ) {
    super();
  }

  @Query()
  public async activeTasks(): Promise<ActiveTasksDto> {
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
