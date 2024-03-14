import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Privacity } from './Privacity';
import { RecipeVariant } from '@src/recipe-variants/domain/RecipeVariant';
import { Category } from '@src/shared/domain/Category';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  bookCover: string;

  @Column({ type: 'enum', enum: Privacity, default: Privacity.PRIVATE })
  privacity: Privacity;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @OneToMany(() => RecipeVariant, (recipeVariant) => recipeVariant.recipe, {
    onDelete: 'CASCADE',
  })
  variants: RecipeVariant[];
}
