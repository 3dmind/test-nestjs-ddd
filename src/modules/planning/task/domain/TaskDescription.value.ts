import Ramda from 'ramda';
import { ValueObject } from '../../../../core/domain';
import { isLengthGreaterThen, isString } from './validators';

function isValidTaskDescription(text: string): boolean {
  return Ramda.allPass([isString, isLengthGreaterThen(0)])(text);
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

  public static create(text: string): TaskDescription {
    if (isValidTaskDescription(text)) {
      return new TaskDescription({ value: text });
    }
  }
}
