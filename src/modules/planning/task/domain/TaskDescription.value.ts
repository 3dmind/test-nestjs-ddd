import { allPass, compose, flip, gt, is, prop, isNil } from 'ramda';
import { ValueObject } from '../../../../core/domain';
import { Result } from '../../../../core/logic';

const isLengthGreaterZero = compose(flip(gt)(0), prop('length'));
const isString = is(String);

function isTextValid(text: string): boolean {
  return allPass([isString, isLengthGreaterZero])(text);
}

interface TaskDescriptionProps {
  value: string;
}

export class TaskDescription extends ValueObject<TaskDescriptionProps> {
  private constructor(props: TaskDescriptionProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(text: string): Result<TaskDescription> {
    if (isNil(text)) {
      return Result.fail<TaskDescription>(
        `Task description text can't be 'null' or 'undefined'`,
      );
    } else if (!isTextValid(text)) {
      return Result.fail<TaskDescription>(
        'Task description text is not valid.',
      );
    } else {
      return Result.ok<TaskDescription>(new TaskDescription({ value: text }));
    }
  }
}
