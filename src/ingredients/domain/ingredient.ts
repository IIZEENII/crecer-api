import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UnitType } from './unit-types';
import { RecipeVariant } from 'src/recipe-variants/domain/recipe-variant';

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column('money')
  price: number;
  @Column('money')
  stock: number;
  @Column({ type: 'enum', enum: UnitType })
  unitType: UnitType;
  @ManyToMany(() => RecipeVariant, (recipeVariant) => recipeVariant.ingredients)
  recipeVariants: RecipeVariant[];
}
