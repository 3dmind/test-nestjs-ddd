import Ramda from 'ramda';

type ValueObjectProperties = Record<string, any>;

export abstract class ValueObject<T extends ValueObjectProperties> {
  public readonly props: T;

  protected constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (Ramda.isNil(vo)) {
      return false;
    }

    if (vo.props === undefined) {
      return false;
    }

    return Ramda.equals(this.props, vo.props);
  }
}
