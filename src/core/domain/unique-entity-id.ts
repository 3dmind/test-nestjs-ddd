import Ramda from 'ramda';
import uuid from 'uuid/v4';

export class UniqueEntityId {
  private readonly _value: string;

  private constructor(id: string) {
    this._value = id;
  }

  get value(): string {
    return this._value;
  }

  equals(id?: UniqueEntityId): boolean {
    if (Ramda.isNil(id)) {
      return false;
    }

    if (!Ramda.is(UniqueEntityId, id)) {
      return false;
    }

    return id.value === this._value;
  }

  static create(id?: string): UniqueEntityId {
    return new UniqueEntityId(id ? id : uuid());
  }
}
