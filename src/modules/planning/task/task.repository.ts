import { Inject, Injectable } from '@nestjs/common';
import { Repository } from '../../../core/infrastructure/';
import { TASK_MODEL_INJECTION_TOKEN } from './constants';
import { TaskEntity, TaskId } from './domain';
import { TaskMapper } from './task.mapper';
import { TaskModel } from './task.model';

interface ITaskRepository extends Repository<TaskEntity> {
  findAllTasks(): Promise<TaskEntity[]>;
  findByTaskId(taskId: TaskId): Promise<[boolean, TaskEntity?]>;
}

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    private readonly taskMapper: TaskMapper,
    @Inject(TASK_MODEL_INJECTION_TOKEN)
    private readonly taskModel: typeof TaskModel,
  ) {}

  public async exists(taskEntity: TaskEntity): Promise<boolean> {
    const taskModel = await this.taskModel.findByPk(taskEntity.id.value);
    return !!taskModel === true;
  }

  public async save(taskEntity: TaskEntity): Promise<TaskEntity> {
    const exists = await this.exists(taskEntity);
    const taskModel = this.taskMapper.toPersistence(taskEntity);
    if (!exists) {
      await taskModel.save();
    } else {
      await this.taskModel.update(taskModel.toJSON(), {
        where: { taskId: taskEntity.id.value },
      });
    }
    // TODO: Return entity only on success.
    return taskEntity;
  }

  public async findAllTasks(): Promise<TaskEntity[]> {
    const taskModels = await this.taskModel.findAll();
    return taskModels.map((taskModel) => this.taskMapper.toDomain(taskModel));
  }

  public async findByTaskId(taskId: TaskId): Promise<[boolean, TaskEntity?]> {
    const taskModel = await this.taskModel.findByPk(taskId.id.value);
    const found = !!taskModel === true;
    if (found) {
      const taskEntity = this.taskMapper.toDomain(taskModel);
      return [found, taskEntity];
    } else {
      return [found];
    }
  }
}
