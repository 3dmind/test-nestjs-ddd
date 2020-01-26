import { Int, Field, ObjectType } from 'type-graphql';
import { TaskDto } from '../../task.dto';

@ObjectType()
export class AllTasksDto {
  @Field(() => Int)
  count: number;

  @Field(() => [TaskDto])
  tasks: TaskDto[];
}
