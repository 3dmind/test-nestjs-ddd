import { Field, Int, ObjectType } from 'type-graphql';
import { TaskDto } from '../../task.dto';

@ObjectType()
export class ActiveTasksDto {
  @Field(() => Int)
  count: number;

  @Field((type) => [TaskDto], {
    nullable: true,
  })
  tasks?: TaskDto[];
}
