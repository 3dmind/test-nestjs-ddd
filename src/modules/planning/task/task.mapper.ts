import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '../../../core/domain';
import { Task } from '../../../graphql.schema';
import { TaskDescription, TaskEntity } from './domain';
import { TaskModel } from './task.model';

@Injectable()
export class TaskMapper {
  public toDomain(taskModel: TaskModel): TaskEntity {
    return TaskEntity.create(
      {
        description: TaskDescription.create(taskModel.description),
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
      UniqueEntityID.create(taskModel.taskId),
    );
  }

  public toDTO(taskEntity: TaskEntity): Task {
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
    };
  }

  public toPersistence(taskEntity: TaskEntity): TaskModel {
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
