import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Privacity } from './Privacity';
import { RecipeVariant } from '@src/recipe-variants/domain/RecipeVariant';
import { Categories } from 'src/shared/domain/Categories';

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

  @Column({ type: 'enum', enum: Categories })
  category: Categories;

  @OneToMany(() => RecipeVariant, (recipeVariant) => recipeVariant.recipe, {
    onDelete: 'CASCADE',
  })
  variants: RecipeVariant[];
}
