import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../../../core/infrastructure';
import { GenericAppErrors } from '../../../../../core/logic';
import { TaskDto } from '../../task.dto';
import { TaskMapper } from '../../task.mapper';
import { EditTaskDto } from './edit-task.dto';
import { EditTaskErrors } from './edit-task.errors';
import { EditTaskUseCase } from './edit-task.use-case';

@Resolver(() => TaskDto)
export class EditTaskResolver extends BaseResolver {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly editTaskUseCase: EditTaskUseCase,
  ) {
    super();
  }

  @Mutation(() => TaskDto)
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
}
