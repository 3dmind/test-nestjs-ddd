import { UniqueEntityId } from './unique-entity-id';
import Ramda from 'ramda';

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityId;
  public readonly props: T;

  protected constructor(props: T, id?: UniqueEntityId) {
    this._id = id ? id : UniqueEntityId.create();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (Ramda.isNil(object)) {
      return false;
    }

    if (!Ramda.is(Entity, object)) {
      return false;
    }

    if (this === object) {
      return true;
    }

    return this._id.equals(object._id);
  }
}
