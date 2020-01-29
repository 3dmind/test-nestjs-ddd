import { Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../../../core/infrastructure';
import { TaskDto } from '../../task.dto';
import { TaskMapper } from '../../task.mapper';
import { AllArchivedTasksDto } from './all-archived-tasks.dto';
import { AllArchivedTasksUseCase } from './all-archived-tasks.use-case';

@Resolver(() => TaskDto)
export class AllArchivedTasksResolver extends BaseResolver {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly allArchivedTasksUseCase: AllArchivedTasksUseCase,
  ) {
    super();
  }

  @Query(() => AllArchivedTasksDto)
  public async allArchivedTasks(): Promise<AllArchivedTasksDto> {
    const response = await this.allArchivedTasksUseCase.execute();
    if (response.isLeft()) {
      const result = response.result;
      this.fail(result.error.message);
    }
    if (response.isRight()) {
      const { count, archivedTasks } = response.result.value;
      return {
        count,
        tasks: archivedTasks.map((task) => this.taskMapper.toDTO(task)),
      };
    }
  }
}
