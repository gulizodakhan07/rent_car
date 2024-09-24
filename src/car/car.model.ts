import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Car extends Model<Car> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  make: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  model: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  pricePerDay: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  available: boolean;
}
