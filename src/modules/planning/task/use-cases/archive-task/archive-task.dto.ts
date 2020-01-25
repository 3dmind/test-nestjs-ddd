import { Field, InputType } from 'type-graphql';

@InputType()
export class ArchiveTaskDto {
  @Field()
  taskId: string;
}
