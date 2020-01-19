import { allPass, compose, flip, gt, is, isNil, prop } from 'ramda';
import { ValueObject } from '../../../../core/domain';
import { Result } from '../../../../core/logic';

const isLengthGreaterZero = compose(flip(gt)(0), prop('length'));
const isString = is(String);

function isTextValid(text: string): boolean {
  return allPass([isString, isLengthGreaterZero])(text);
}

interface DescriptionProps {
  value: string;
}

export class Description extends ValueObject<DescriptionProps> {
  private constructor(props: DescriptionProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(text: string): Result<Description> {
    if (isNil(text)) {
      return Result.fail<Description>(
        `Task description text can't be 'null' or 'undefined'`,
      );
    } else if (!isTextValid(text)) {
      return Result.fail<Description>(
        'Task description text is not valid.',
      );
    } else {
      return Result.ok<Description>(new Description({ value: text }));
    }
  }
}
