import { Right } from './right';

export class Left<L, A> {
  private readonly _result: L;

  constructor(result: L) {
    this._result = result;
  }

  get result(): L {
    return this._result;
  }

  public isLeft(): this is Left<L, A> {
    return true;
  }

  public isRight(): this is Right<L, A> {
    return false;
  }
}
