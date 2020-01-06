import { UniqueEntityID } from './UniqueEntityID';
import Ramda from 'ramda';

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;
  public readonly props: T;

  protected constructor(props: T, id?: UniqueEntityID) {
    this._id = id ? id : UniqueEntityID.create();
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
