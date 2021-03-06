import { Inject, Injectable } from '@nestjs/common';
import { Repository } from '../../../core/infrastructure/';
import { TASK_MODEL_INJECTION_TOKEN } from './constants';
import { Task, TaskId } from './domain';
import { TaskMapper } from './task.mapper';
import { TaskModel } from './task.model';

interface ITaskRepository extends Repository<Task> {
  findAndCountAllTasks(): Promise<{ count: number; tasks: Task[] }>;

  findByTaskId(taskId: TaskId): Promise<[boolean, Task?]>;

  findAndCountActiveTasks(): Promise<{ count: number; activeTasks: Task[] }>;

  findAndCountArchivedTasks(): Promise<{
    count: number;
    archivedTasks: Task[];
  }>;
}

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    private readonly taskMapper: TaskMapper,
    @Inject(TASK_MODEL_INJECTION_TOKEN)
    private readonly taskModel: typeof TaskModel,
  ) {}

  public async exists(taskEntity: Task): Promise<boolean> {
    const taskModel = await this.taskModel.findByPk(taskEntity.id.value);
    return !!taskModel === true;
  }

  public async save(taskEntity: Task): Promise<Task> {
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

  public async findAndCountAllTasks(): Promise<{
    count: number;
    tasks: Task[];
  }> {
    const { count, rows: taskModels } = await this.taskModel.findAndCountAll();
    const tasks = taskModels.map((taskModel) =>
      this.taskMapper.toDomain(taskModel),
    );
    return {
      count,
      tasks,
    };
  }

  public async findByTaskId(taskId: TaskId): Promise<[boolean, Task?]> {
    const taskModel = await this.taskModel.findByPk(taskId.id.value);
    const found = !!taskModel === true;
    if (found) {
      const taskEntity = this.taskMapper.toDomain(taskModel);
      return [found, taskEntity];
    } else {
      return [found];
    }
  }

  public async findAndCountActiveTasks(): Promise<{
    count: number;
    activeTasks: Task[];
  }> {
    const { count, rows: taskModels } = await this.taskModel.findAndCountAll({
      where: {
        isDiscarded: false,
        isArchived: false,
      },
    });
    const activeTasks = taskModels.map((taskModel) =>
      this.taskMapper.toDomain(taskModel),
    );
    return { count, activeTasks };
  }

  public async findAndCountArchivedTasks(): Promise<{
    count: number;
    archivedTasks: Task[];
  }> {
    const { count, rows: taskModels } = await this.taskModel.findAndCountAll({
      where: {
        isDiscarded: false,
        isArchived: true,
      },
    });
    const archivedTasks = taskModels.map((taskModel) =>
      this.taskMapper.toDomain(taskModel),
    );
    return { count, archivedTasks };
  }
}
