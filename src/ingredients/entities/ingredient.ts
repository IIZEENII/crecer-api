import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UnitType } from '../enums/UnitType';
import { RecipeVariant } from '@src/recipeVariants/entities/RecipeVariant';

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column('numeric')
  stock: number;

  @Column({ type: 'enum', enum: UnitType })
  unitType: UnitType;

  @ManyToMany(() => RecipeVariant, (recipeVariant) => recipeVariant.ingredients)
  @JoinTable({ name: 'recipe_variants_and_ingredients' })
  recipeVariants: RecipeVariant[];
}
