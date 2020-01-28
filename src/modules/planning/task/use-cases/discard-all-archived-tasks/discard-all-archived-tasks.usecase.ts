import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../../../core/domain';
import { Either, GenericAppErrors, Result } from '../../../../../core/logic';
import { Task } from '../../domain';
import { ArchivedTasksUseCase } from '../archived-tasks/archived-tasks.usecase';

interface UseCaseResult {
  count: number;
  archivedTasks: Task[];
}

type Response = Either<GenericAppErrors.UnexpectedError, Result<UseCaseResult>>;

@Injectable()
export class DiscardAllArchivedTasksUseCase implements UseCase<void, Response> {
  constructor(private readonly archivedTasksUseCase: ArchivedTasksUseCase) {}

  public async execute(): Promise<Response> {
    return await this.archivedTasksUseCase.execute();
  }
}
