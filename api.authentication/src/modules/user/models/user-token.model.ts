import {
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  Model,
} from 'sequelize-typescript';

import { User } from '@modules/user/models/user.model';

@Table({ tableName: 'users_tokens' })
export class UserToken extends Model<UserToken> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    field: 'refresh_token',
  })
  refreshToken: string;

  @Column({
    type: DataType.DATE,
    field: 'expires_date',
  })
  expiresDate: Date;

  @BelongsTo(() => User, 'userId')
  user: User;
}
