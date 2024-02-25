import { Procedure } from 'src/procedures/domain/procedure';
import { Recipe } from 'src/recipes/domain/recipe';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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
}
