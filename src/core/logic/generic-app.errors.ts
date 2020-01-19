import { Result } from './result';
import { UseCaseError } from './use-case-error';

export namespace GenericAppErrors {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        message: 'An unexpected error occurred.',
        error: err,
      } as UseCaseError);
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}
