import { Module } from '@nestjs/common';
import { IngredientsController } from './IngredientsController';
import { IngredientCreator } from '../application/IngredientCreator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from '../domain/Ingredient';
import { AllIngredientsFinder } from '../application/AllIngredientsFinder';
import { IngredientFinderById } from '../application/IngredientFinderById';
import { IngredientUnitTypeUpdaterWithoutRecipeVariants } from '../application/IngredientUnitTypeUpdaterWithoutRecipeVariants';
import { IngredientDeleterWithoutRecipeVariants } from '../application/IngredientDeleterWithoutRecipeVariants';
import { IngredientFinderJoinedToRecipeVariants } from '../application/IngredientFinderWithRecipeVariants';
import { IngredientNameUpdater } from '../application/IngredientNameUpdater';
import { IngredientStockUpdater } from '../application/IngredientStockUpdater';
import { IngredientPriceUpdater } from '../application/IngredientPriceUpdater';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  controllers: [IngredientsController],
  providers: [
    IngredientCreator,
    AllIngredientsFinder,
    IngredientFinderById,
    IngredientUnitTypeUpdaterWithoutRecipeVariants,
    IngredientDeleterWithoutRecipeVariants,
    IngredientFinderJoinedToRecipeVariants,
    IngredientNameUpdater,
    IngredientStockUpdater,
    IngredientPriceUpdater,
  ],
})
export class IngredientsModule {}
