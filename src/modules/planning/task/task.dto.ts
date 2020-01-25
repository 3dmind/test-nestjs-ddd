import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class TaskDto {
  @Field(() => ID)
  taskId: string;

  @Field()
  description: string;

  @Field()
  createdAt: string;

  @Field()
  isTickedOff: boolean;

  @Field({ nullable: true })
  tickedOffAt?: string;

  @Field({ nullable: true })
  resumedAt?: string;

  @Field({ nullable: true })
  editedAt?: string;

  @Field()
  isArchived: boolean;

  @Field({ nullable: true })
  archivedAt?: string;

  @Field()
  isDiscarded: boolean;

  @Field({ nullable: true })
  discardedAt?: string;
}
