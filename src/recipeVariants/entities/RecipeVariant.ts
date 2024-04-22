import { Ingredient } from '@src/ingredients/entities/ingredient';
import { Procedure } from '@src/procedures/entities/Producedure';
import { Recipe } from '@src/recipes/entities/recipe';

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

  @ManyToOne(() => Recipe, (recipe) => recipe.variants, { onDelete: 'CASCADE' })
  recipe: Recipe;
}
