import { Entity, UniqueEntityId } from '../../../../core/domain';

export class TaskId extends Entity<any> {
  get id(): UniqueEntityId {
    return this._id;
  }

  private constructor(id: UniqueEntityId) {
    super(null, id);
  }

  public static create(id?: UniqueEntityId): TaskId {
    return new TaskId(id);
  }
}
