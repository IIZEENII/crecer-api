import { Module } from '@nestjs/common';
import { RecipeVariantsController } from './RecipeVariantsController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/RecipeVariant';
import { UnitOfWorkForRecipes } from 'src/shared/infrastructure/unit-of-work/UnitOfWorkForRecipes';
import { RecipeVariantCopier } from '../application/RecipeVariantCopier';
import { RecipeVariantFinder } from '../application/RecipeVariantFinder';
import { IngredientAgregatorForRecipeVariant } from '../application/IngredientAgregatorForRecipeVariant';
import { RecipeVariantCreator } from '../application/RecipeVariantCreator';
import { IngredientsModule } from '@src/ingredients/infrastructure/IngredientsModule';
import { IngredientRemoverForRecipeVariant } from '../application/IngredientRemoveForRecipeVariant';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeVariant]), IngredientsModule],
  controllers: [RecipeVariantsController],
  providers: [
    RecipeVariantCopier,
    RecipeVariantFinder,
    UnitOfWorkForRecipes,
    IngredientAgregatorForRecipeVariant,
    RecipeVariantCreator,
    IngredientRemoverForRecipeVariant,
  ],
  exports: [RecipeVariantCreator],
})
export class RecipeVariantsModule {}
