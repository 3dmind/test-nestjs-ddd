import { Field, InputType } from 'type-graphql';

@InputType()
export class EditTaskDto {
  @Field()
  taskId: string;

  @Field()
  text: string;
}
