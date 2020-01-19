export abstract class UseCaseError {
  public readonly message: string;

  protected constructor(message: string) {
    this.message = message;
  }
}
