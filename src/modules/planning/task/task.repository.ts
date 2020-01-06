import { Inject, Injectable } from '@nestjs/common';
import { UniqueEntityID } from '../../../core/domain';
import { IRepository } from '../../../core/infrastructure/';
import { TaskEntity } from './domain';
import { TaskMapper } from './task.mapper';
import { TaskModel } from './task.model';

interface ITaskRepository extends IRepository<TaskEntity> {
  findAllTasks(): Promise<TaskEntity[]>;

  findTaskById(taskId: UniqueEntityID): Promise<TaskEntity>;
}

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    private readonly taskMapper: TaskMapper,
    @Inject('TASK_MODEL') private readonly taskModel: typeof TaskModel,
  ) {}

  public async findAllTasks(): Promise<TaskEntity[]> {
    const taskModels = await this.taskModel.findAll();
    return taskModels.map((taskModel) => this.taskMapper.toDomain(taskModel));
  }

  public async exists(taskEntity: TaskEntity): Promise<boolean> {
    const taskId = taskEntity.id.value;
    const taskModel = await this.taskModel.findOne({ where: { taskId } });
    return !!taskModel === true;
  }

  public async findTaskById(taskId: UniqueEntityID): Promise<TaskEntity> {
    const taskModel = await this.taskModel.findOne({
      where: { taskId: taskId.value },
    });
    return this.taskMapper.toDomain(taskModel);
  }

  public async save(taskEntity: TaskEntity): Promise<TaskEntity> {
    const exists = await this.exists(taskEntity);
    const taskModelInstance = this.taskMapper.toPersistence(taskEntity);
    try {
      if (!exists) {
        taskModelInstance.save();
      } else {
        await this.taskModel.update(taskModelInstance, {
          where: { taskId: taskEntity.id.value },
        });
      }
    } catch (error) {
      console.log(error);
    }

    return taskEntity;
  }
}
