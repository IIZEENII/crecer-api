import { RecipeVariant } from '@src/recipe-variants/domain/RecipeVariant';
import { Category } from '@src/shared/domain/Category';
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

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @OneToOne(() => RecipeVariant, (recipeVariant) => recipeVariant.product)
  @JoinColumn()
  recipeVariant: RecipeVariant;
}
