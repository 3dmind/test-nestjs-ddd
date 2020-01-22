import { Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../../../core/infrastructure';
import { ArchivedTasksDto } from '../../../../../graphql.schema';
import { TaskMapper } from '../../task.mapper';
import { ArchivedTasksUseCase } from './archived-tasks.usecase';

@Resolver()
export class ArchivedTasksResolver extends BaseResolver {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly archivedTasksUseCase: ArchivedTasksUseCase,
  ) {
    super();
  }

  @Query()
  public async archivedTasks(): Promise<ArchivedTasksDto> {
    const response = await this.archivedTasksUseCase.execute();
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
