import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TaskModule } from '../planning/task/task.module';

@Module({
  imports: [
    TaskModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
  ],
})
export class ApplicationModule {}
