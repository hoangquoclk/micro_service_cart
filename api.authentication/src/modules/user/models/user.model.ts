import {
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

import { USERS_TABLE_NAME } from '@shared/constants/constants';
import { BaseModel } from '@shared/base/base.model';

@Table({ tableName: USERS_TABLE_NAME, paranoid: true })
export class User extends BaseModel<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;
}
