import { RecipeVariant } from '@src/recipeVariants/entities/RecipeVariant';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'money', default: 0 })
  price: number;

  @Column({ type: 'money', default: 0 })
  stock: number;

  @Column({ nullable: true })
  description: string;

  @OneToOne(() => RecipeVariant, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  recipeVariant: RecipeVariant;
}
