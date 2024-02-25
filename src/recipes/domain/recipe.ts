import { RecipeVariant } from 'src/recipe-variants/domain/recipe-variant';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column({ enum: ['public', 'private'], default: 'private' })
  privacity: string;
  @OneToMany(() => RecipeVariant, (recipeVariant) => recipeVariant.recipe)
  variants: RecipeVariant[];
}
