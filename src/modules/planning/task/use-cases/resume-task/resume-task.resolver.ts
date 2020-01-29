import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../../../../core/infrastructure';
import { GenericAppErrors } from '../../../../../core/logic';
import { TaskDto } from '../../task.dto';
import { TaskMapper } from '../../task.mapper';
import { ResumeTaskDto } from './resume-task.dto';
import { ResumeTaskErrors } from './resume-task.errors';
import { ResumeTaskUseCase } from './resume-task.use-case';

@Resolver(() => TaskDto)
export class ResumeTaskResolver extends BaseResolver {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly resumeTaskUseCase: ResumeTaskUseCase,
  ) {
    super();
  }

  @Mutation(() => TaskDto)
  public async resumeTask(
    @Args('input') args: ResumeTaskDto,
  ): Promise<TaskDto> {
    const response = await this.resumeTaskUseCase.execute(args);
    if (response.isLeft()) {
      const result = response.result;
      if (result instanceof ResumeTaskErrors.TaskDoesNotExist) {
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
