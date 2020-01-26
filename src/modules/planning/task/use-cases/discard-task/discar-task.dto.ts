import { Field, InputType } from 'type-graphql';

@InputType()
export class DiscardTaskDto {
  @Field()
  taskId: string;
}
