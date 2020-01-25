import { Field, Int, ObjectType } from 'type-graphql';
import { TaskDto } from '../../task.dto';

@ObjectType()
export class ArchivedTasksDto {
  @Field(() => Int)
  count: number;

  @Field(() => [TaskDto], {
    nullable: true,
  })
  tasks?: TaskDto[];
}
