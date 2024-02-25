import { RecipeVariant } from 'src/recipe-variants/domain/recipe-variant';
import { Categories } from 'src/shared/domain/categories';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Privacity } from './privacity';

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
  categories: Categories;
  @OneToMany(() => RecipeVariant, (recipeVariant) => recipeVariant.recipe)
  variants: RecipeVariant[];
}
