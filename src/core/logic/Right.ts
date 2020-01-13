import { Left } from './Left';

export class Right<L, A> {
  private readonly _result: A;

  constructor(result: A) {
    this._result = result;
  }

  get result(): A {
    return this._result;
  }

  public isLeft(): this is Left<L, A> {
    return false;
  }

  public isRight(): this is Right<L, A> {
    return true;
  }
}
