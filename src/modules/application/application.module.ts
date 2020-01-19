import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import { TaskModule } from '../planning/task/task.module';

@Module({
  imports: [
    DatabaseModule,
    TaskModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      debug: false,
    }),
  ],
})
export class ApplicationModule {}
