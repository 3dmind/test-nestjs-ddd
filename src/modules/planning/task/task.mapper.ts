import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from '../../../core/domain';
import { TaskDto } from '../../../graphql.schema';
import { Description, Task } from './domain';
import { TaskModel } from './task.model';

@Injectable()
export class TaskMapper {
  public toDomain(taskModel: TaskModel): Task {
    return Task.create(
      {
        description: Description.create(taskModel.description).value,
        createdAt: taskModel.createdAt,
        editedAt: taskModel.editedAt,
        tickedOff: taskModel.isTickedOff,
        tickedOffAt: taskModel.tickedOffAt,
        resumedAt: taskModel.resumedAt,
        archived: taskModel.isArchived,
        archivedAt: taskModel.archivedAt,
        discarded: taskModel.isDiscarded,
        discardedAt: taskModel.discardedAt,
      },
      UniqueEntityId.create(taskModel.taskId),
    );
  }

  public toDTO(taskEntity: Task): TaskDto {
    return {
      taskId: taskEntity.id.value,
      description: taskEntity.description.value,
      createdAt: taskEntity.createdAt.toISOString(),
      editedAt: taskEntity.editedAt?.toISOString(),
      isTickedOff: taskEntity.isTickedOff(),
      tickedOffAt: taskEntity.tickedOffAt?.toISOString(),
      resumedAt: taskEntity.resumedAt?.toISOString(),
      isArchived: taskEntity.isArchived(),
      archivedAt: taskEntity.archivedAt?.toISOString(),
      isDiscarded: taskEntity.isDiscarded(),
      discardedAt: taskEntity.discardedAt?.toISOString(),
    };
  }

  public toPersistence(taskEntity: Task): TaskModel {
    const taskModel = new TaskModel();
    taskModel.taskId = taskEntity.id.value;
    taskModel.description = taskEntity.description.value;
    taskModel.createdAt = taskEntity.createdAt;
    taskModel.editedAt = taskEntity.editedAt;
    taskModel.isTickedOff = taskEntity.isTickedOff();
    taskModel.tickedOffAt = taskEntity.tickedOffAt;
    taskModel.resumedAt = taskEntity.resumedAt;
    taskModel.isDiscarded = taskEntity.isDiscarded();
    taskModel.discardedAt = taskEntity.discardedAt;
    taskModel.isArchived = taskEntity.isArchived();
    taskModel.archivedAt = taskEntity.archivedAt;
    return taskModel;
  }
}
