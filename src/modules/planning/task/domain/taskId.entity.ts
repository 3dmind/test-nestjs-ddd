import { Entity, UniqueEntityID } from '../../../../core/domain';

export class TaskId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): TaskId {
    return new TaskId(id);
  }
}
