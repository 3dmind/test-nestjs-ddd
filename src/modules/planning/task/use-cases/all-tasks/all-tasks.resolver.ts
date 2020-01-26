import { Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../../../core/infrastructure';
import { TaskDto } from '../../task.dto';
import { TaskMapper } from '../../task.mapper';
import { AllTasksDto } from './all-tasks.dto';
import { AllTasksUseCase } from './all-tasks.usecase';

@Resolver(() => TaskDto)
export class AllTasksResolver extends BaseResolver {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly getAllTasksUseCase: AllTasksUseCase,
  ) {
    super();
  }

  @Query(() => AllTasksDto)
  public async allTasks(): Promise<AllTasksDto> {
    const response = await this.getAllTasksUseCase.execute();
    if (response.isLeft()) {
      const result = response.result;
      this.fail(result.error.message);
    }
    if (response.isRight()) {
      const { count, tasks } = response.result.value;
      return {
        count,
        tasks: tasks.map((task) => this.taskMapper.toDTO(task)),
      };
    }
  }
}
