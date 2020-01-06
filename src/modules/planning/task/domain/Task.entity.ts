import { Entity, UniqueEntityID } from '../../../../core/domain';
import { TaskDescription } from './TaskDescription.value';

interface TaskEntityProps {
  description: TaskDescription;
  createdAt: Date;
  tickedOff: boolean;
  tickedOffAt: Date;
  resumedAt: Date;
  editedAt: Date;
  discarded: boolean;
  discardedAt: Date;
  archived: boolean;
  archivedAt: Date;
}

export class TaskEntity extends Entity<TaskEntityProps> {
  private constructor(props: TaskEntityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get description(): TaskDescription {
    return this.props.description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get tickedOffAt(): Date {
    return this.props.tickedOffAt;
  }

  get resumedAt(): Date {
    return this.props.resumedAt;
  }

  get editedAt(): Date {
    return this.props.editedAt;
  }

  get discardedAt(): Date {
    return this.props.discardedAt;
  }

  get archivedAt(): Date {
    return this.props.archivedAt;
  }

  public static create(
    props: TaskEntityProps,
    id?: UniqueEntityID,
  ): TaskEntity {
    return new TaskEntity(props, id);
  }

  public static note(
    description: TaskDescription,
  ): TaskEntity {
    return TaskEntity.create({
      createdAt: new Date(),
      description,
      tickedOff: false,
      tickedOffAt: undefined,
      resumedAt: undefined,
      editedAt: undefined,
      discarded: false,
      discardedAt: undefined,
      archived: false,
      archivedAt: undefined,
    });
  }

  public tickOff(): void {
    this.props.tickedOff = true;
    this.props.tickedOffAt = new Date();
  }

  public isTickedOff(): boolean {
    return this.props.tickedOff;
  }

  public resume(): void {
    this.props.tickedOff = false;
    this.props.resumedAt = new Date();
  }

  public edit(description: TaskDescription): void {
    this.props.description = description;
    this.props.editedAt = new Date();
  }

  public discard(): void {
    this.props.discarded = true;
    this.props.discardedAt = new Date();
  }

  public isDiscarded(): boolean {
    return this.props.discarded;
  }

  public archive(): void {
    this.props.archived = true;
    this.props.archivedAt = new Date();
  }

  public isArchived(): boolean {
    return this.props.archived;
  }
}
