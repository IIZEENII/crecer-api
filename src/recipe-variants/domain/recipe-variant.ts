import { Procedure } from 'src/procedures/domain/procedure';
import { Product } from 'src/products/domain/product';
import { Recipe } from 'src/recipes/domain/recipe';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('recipeVariants')
export class RecipeVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => Procedure, (procedure) => procedure.recipeVariant)
  procedures: Procedure[];
  @ManyToOne(() => Recipe, (recipe) => recipe.variants)
  recipe: Recipe;
  @OneToOne(() => Product, (product) => product.recipeVariant)
  product: Product;
}
