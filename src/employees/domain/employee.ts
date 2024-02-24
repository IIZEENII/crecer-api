import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employees')
export class Empoloyee {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
}
