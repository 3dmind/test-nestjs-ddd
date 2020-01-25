import { Field, InputType } from 'type-graphql';

@InputType()
export class NoteTaskDto {
  @Field()
  text: string;
}
