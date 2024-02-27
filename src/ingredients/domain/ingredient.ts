import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MeasurementUnits } from './measurement-units';

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column('money')
  price: number;
  @Column('money')
  stock: number;
  @Column({ type: 'enum', enum: MeasurementUnits })
  measurementUnit: MeasurementUnits;
}
