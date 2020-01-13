interface UseCaseErrorError {
  message: string;
}

export abstract class UseCaseError implements UseCaseErrorError {
  public readonly message: string;

  protected constructor(message: string) {
    this.message = message;
  }
}
