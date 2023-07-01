import { Column, DataType, Model } from 'sequelize-typescript';

export class BaseModel<T> extends Model<T> {
  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null,
    field: 'deletedAt',
  })
  deletedAt: Date;
}
