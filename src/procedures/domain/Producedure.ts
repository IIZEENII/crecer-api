import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeVariant } from '@src/recipe-variants/domain/RecipeVariant';

@Entity('procedures')
export class Procedure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @ManyToOne(() => RecipeVariant, (recipeVariant) => recipeVariant.procedures)
  recipeVariant: RecipeVariant;
}
