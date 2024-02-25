import { RecipeVariant } from 'src/recipe-variants/domain/recipe-variant';
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
  @OneToOne(() => RecipeVariant, (recipeVariant) => recipeVariant.product)
  @JoinColumn()
  recipeVariant: RecipeVariant;
}
