import { Ingredient } from 'src/ingredients/domain/ingredient';
import { Procedure } from 'src/procedures/domain/procedure';
import { Product } from 'src/products/domain/product';
import { Recipe } from 'src/recipes/domain/recipe';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('recipe_variants')
export class RecipeVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToMany(() => Ingredient)
  @JoinTable({ name: 'recipe_variants_and_ingredients' })
  ingredients: Ingredient[];
  @OneToMany(() => Procedure, (procedure) => procedure.recipeVariant)
  procedures: Procedure[];
  @ManyToOne(() => Recipe, (recipe) => recipe.variants)
  recipe: Recipe;
  @OneToOne(() => Product, (product) => product.recipeVariant)
  product: Product;
}
