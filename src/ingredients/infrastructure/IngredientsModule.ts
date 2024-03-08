import { Module } from '@nestjs/common';
import { IngredientsController } from './IngredientsController';
import { IngredientCreator } from '../application/IngredientCreator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from '../domain/Ingredient';
import { IngredientsFinder } from '../application/IngredientsFinder';
import { IngredientUpdater } from '../application/IngredientUpdater';
import { IngredientDeleterWithoutRecipeVariants } from '../application/IngredientDeleterWithoutRecipeVariants';
@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  controllers: [IngredientsController],
  providers: [
    IngredientCreator,
    IngredientsFinder,
    IngredientUpdater,
    IngredientDeleterWithoutRecipeVariants,
  ],
})
export class IngredientsModule {}
