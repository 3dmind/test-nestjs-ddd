import { Inject, Injectable } from '@nestjs/common';
import { Repository } from '../../../core/infrastructure/';
import { TaskEntity } from './domain';
import { TaskMapper } from './task.mapper';
import { TaskModel } from './task.model';

interface ITaskRepository extends Repository<TaskEntity> {
  findAllTasks(): Promise<TaskEntity[]>;
}

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    private readonly taskMapper: TaskMapper,
    @Inject('TASK_MODEL') private readonly taskModel: typeof TaskModel,
  ) {}

  public async exists(taskEntity: TaskEntity): Promise<boolean> {
    const taskModel = await this.taskModel.findByPk(taskEntity.id.value);
    return !!taskModel === true;
  }

  public async save(taskEntity: TaskEntity): Promise<TaskEntity> {
    const exists = await this.exists(taskEntity);
    const taskModelInstance = this.taskMapper.toPersistence(taskEntity);
    if (!exists) {
      taskModelInstance.save();
    } else {
      await this.taskModel.update(taskModelInstance, {
        where: { taskId: taskEntity.id.value },
      });
    }
    return taskEntity;
  }

  public async findAllTasks(): Promise<TaskEntity[]> {
    const taskModels = await this.taskModel.findAll();
    return taskModels.map((taskModel) => this.taskMapper.toDomain(taskModel));
  }
}
