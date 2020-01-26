import { Field, InputType } from 'type-graphql';

@InputType()
export class TickOffTaskDto {
  @Field()
  taskId: string;
}
