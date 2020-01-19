export class BaseResolver {
  public fail(error: Error | string): void {
    throw new Error(error.toString());
  }
}
