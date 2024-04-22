import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Privacity } from '../enums/privacity';
import { RecipeVariant } from '@src/recipeVariants/entities/RecipeVariant';
import { Category } from '@src/shared/enums/Category';

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
