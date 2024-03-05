import { Module } from '@nestjs/common';
import { RecipeVariantsController } from './RecipeVariantsController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/RecipeVariant';
import { UnitOfWorkForRecipes } from 'src/shared/infrastructure/unit-of-work/UnitOfWorkForRecipes';
import { RecipeVariantCopier } from '../application/RecipeVariantCopier';
import { RecipeVariantFinder } from '../application/RecipeVariantFinder';
import { RecipeVariantFinderJoinedToRecipe } from '../application/RecipeVariantsFinderJoinedToRecipe';
import { IngredientAgregatorToRecipeVariant } from '../application/IngredientAgregatorToRecipeVariant';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeVariant])],
  controllers: [RecipeVariantsController],
  providers: [
    RecipeVariantCopier,
    RecipeVariantFinder,
    UnitOfWorkForRecipes,
    RecipeVariantFinderJoinedToRecipe,
    IngredientAgregatorToRecipeVariant,
  ],
})
export class RecipeVariantsModule {}
