import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'tasks',
  timestamps: false,
  underscored: true,
})
export class TaskModel extends Model<TaskModel> {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: DataType.UUID,
  })
  taskId: string;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    allowNull: true,
  })
  editedAt: Date;

  @Column({
    allowNull: true,
  })
  isTickedOff: boolean;

  @Column({
    allowNull: true,
  })
  tickedOffAt: Date;

  @Column({
    allowNull: true,
  })
  resumedAt: Date;

  @Column({
    allowNull: true,
  })
  isDiscarded: boolean;

  @Column({
    allowNull: true,
  })
  discardedAt: Date;

  @Column({
    allowNull: true,
  })
  isArchived: boolean;

  @Column({
    allowNull: true,
  })
  archivedAt: Date;
}
