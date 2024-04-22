import { Module } from '@nestjs/common';
import { RecipeVariantsController } from './controllers/RecipeVariantsController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeVariant } from './entities/RecipeVariant';
import { UnitOfWorkForRecipes } from '@src/shared/infrastructure/unitOfWork/UnitOfWorkForRecipes';
import { RecipeVariantCopier } from './usecases/RecipeVariantCopier';
import { RecipeVariantFinder } from './usecases/RecipeVariantFinder';
import { IngredientAgregatorForRecipeVariant } from './usecases/IngredientAgregatorForRecipeVariant';
import { IngredientsModule } from '@src/ingredients/IngredientsModule';
import { IngredientRemoverForRecipeVariant } from './usecases/IngredientRemoveForRecipeVariant';
import { ProcedureCreatorForRecipeVariant } from './usecases/ProcedureCreatorForRecipeVariant';
import { RecipeVariantUpdater } from './usecases/RecipeVariantUpdater';
import { RecipeVariantDeleter } from './usecases/RecipeVariantDeleter';

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
