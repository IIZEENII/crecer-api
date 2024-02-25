import { RecipeVariant } from 'src/recipe-variants/domain/recipe-variant';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('procedures')
export class Procedure {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  description: string;
  @ManyToOne(() => RecipeVariant, (recipeVariant) => recipeVariant.procedures)
  recipeVariant: RecipeVariant;
}
