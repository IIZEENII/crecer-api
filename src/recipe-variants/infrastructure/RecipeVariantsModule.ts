import { Module } from '@nestjs/common';
import { RecipeVariantsController } from './RecipeVariantsController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/RecipeVariant';
import { UnitOfWorkForRecipes } from '@src/shared/infrastructure/unitOfWork/UnitOfWorkForRecipes';
import { RecipeVariantCopier } from '../application/RecipeVariantCopier';
import { RecipeVariantFinder } from '../application/RecipeVariantFinder';
import { IngredientAgregatorForRecipeVariant } from '../application/IngredientAgregatorForRecipeVariant';
import { IngredientsModule } from '@src/ingredients/infrastructure/IngredientsModule';
import { IngredientRemoverForRecipeVariant } from '../application/IngredientRemoveForRecipeVariant';
import { ProcedureCreatorForRecipeVariant } from '../application/ProcedureCreatorForRecipeVariant';
import { RecipeVariantUpdater } from '../application/RecipeVariantUpdater';
import { RecipeVariantDeleter } from '../application/RecipeVariantDeleter';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeVariant]), IngredientsModule],
  controllers: [RecipeVariantsController],
  providers: [
    RecipeVariantCopier,
    RecipeVariantFinder,
    UnitOfWorkForRecipes,
    RecipeVariantUpdater,
    RecipeVariantDeleter,
    IngredientAgregatorForRecipeVariant,
    IngredientRemoverForRecipeVariant,
    ProcedureCreatorForRecipeVariant,
  ],
  exports: [],
})
export class RecipeVariantsModule {}
