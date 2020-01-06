import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { TaskModel } from '../planning/task/task.model';

async function sequelizeFactory() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'data/database.sqlite',
  });
  sequelize.addModels([TaskModel]);
  await sequelize.sync();
  return sequelize;
}

export const databaseProviders: Provider[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: sequelizeFactory,
  },
];
