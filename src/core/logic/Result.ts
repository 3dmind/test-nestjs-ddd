export class Result<T> {
  private readonly _isSuccess: boolean;
  private readonly _isFailure: boolean;
  private readonly _error: T;
  private readonly _value: T;

  public constructor(isSuccess: boolean, error?: T, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error',
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message',
      );
    }

    this._isSuccess = isSuccess;
    this._isFailure = !isSuccess;
    this._error = error;
    this._value = value;

    Object.freeze(this);
  }

  get isSuccess(): boolean {
    return this._isSuccess;
  }

  get isFailure(): boolean {
    return this._isFailure;
  }

  get value(): T {
    if (this.isFailure) {
      throw new Error(
        `Can't get the value of an error result. Use 'error' instead.`,
      );
    }
    return this._value as T;
  }

  get error(): T {
    return this._error as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: any): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Array<Result<any>>): Result<any> {
    for (const result of results) {
      if (result.isFailure) {
        return result;
      }
    }
    return Result.ok();
  }
}
