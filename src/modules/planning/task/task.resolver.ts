import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NoteTaskInput, Task } from '../../../graphql.schema';
import { TaskDescription, TaskEntity } from './domain';
import { TaskMapper } from './task.mapper';
import { TaskRepository } from './task.repository';

@Resolver('Task')
export class TaskResolver {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly taskRepository: TaskRepository,
  ) {}

  @Query('getTasks')
  async findAllTasks(): Promise<Task[]> {
    const taskEntities = await this.taskRepository.findAllTasks();
    return taskEntities.map((taskEntity) => this.taskMapper.toDTO(taskEntity));
  }

  @Mutation('noteTask')
  async noteTask(@Args('noteTaskInput') args: NoteTaskInput): Promise<Task> {
    const { text } = args;
    const taskDescription = TaskDescription.create(text);
    const taskEntity = TaskEntity.note(taskDescription);
    const savedTaskEntity = await this.taskRepository.save(taskEntity);
    return this.taskMapper.toDTO(savedTaskEntity);
  }
}
