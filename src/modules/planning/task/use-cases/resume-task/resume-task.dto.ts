import { Field, InputType } from 'type-graphql';

@InputType()
export class ResumeTaskDto {
  @Field()
  taskId: string;
}
