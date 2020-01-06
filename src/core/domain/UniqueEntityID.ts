import Ramda from 'ramda';
import uuid from 'uuid/v4';

export class UniqueEntityID {
  private readonly _value: string;

  private constructor(id: string) {
    this._value = id;
  }

  get value(): string {
    return this._value;
  }

  equals(id?: UniqueEntityID): boolean {
    if (Ramda.isNil(id)) {
      return false;
    }

    if (!Ramda.is(UniqueEntityID, id)) {
      return false;
    }

    return id.value === this._value;
  }

  static create(id?: string): UniqueEntityID {
    return new UniqueEntityID(id ? id : uuid());
  }
}
