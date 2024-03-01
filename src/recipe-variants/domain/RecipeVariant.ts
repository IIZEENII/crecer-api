import { Ingredient } from 'src/ingredients/domain/Ingredient';
import { Procedure } from '@src/procedures/domain/Producedure';
import { Product } from '@src/products/domain/Product';
import { Recipe } from '@src/recipes/domain/Recipe';

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
  @OneToOne(() => Product, (product) => product.recipeVariant, { eager: true })
  product: Product;
}
