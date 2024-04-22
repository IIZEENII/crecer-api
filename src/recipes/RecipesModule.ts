import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateRecipeUsecase } from './usecases/CreateRecipe.usecase';
import { FindAllRecipesUsecase } from './usecases/FindAllRecipes.usecase';
import { Recipe } from './entities/recipe';
import { UpdateRecipeUsecase } from './usecases/UpdateRecipe';
import { UnitOfWorkForRecipes } from '@src/shared/infrastructure/unitOfWork/UnitOfWorkForRecipes';
import { FindRecipeByIdUsecase } from './usecases/FindRecipeById.usecase';
import { DeleteRecipeUsecase } from './usecases/DeleteRecipe.usecase';
import { CreateRecipeController } from './controllers/CreateRecipe.controller';
import { UpdateRecipeController } from './controllers/UpdateRecipe.controller';
import { DeleteRecipeController } from './controllers/DeleteRecipe.controller';
import { FindAllRecipesController } from './controllers/FindAllRecipes.controller';
import { FindRecipeByIdController } from './controllers/FindRecipeById.controller';
import { GenerateRecipePDFController } from './controllers/RecipesController';
import { IngredientsModule } from '@src/ingredients/IngredientsModule';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), IngredientsModule],
  controllers: [
    CreateRecipeController,
    UpdateRecipeController,
    DeleteRecipeController,
    FindAllRecipesController,
    FindRecipeByIdController,
    GenerateRecipePDFController,
  ],
  providers: [
    FindAllRecipesUsecase,
    FindRecipeByIdUsecase,
    CreateRecipeUsecase,
    UpdateRecipeUsecase,
    DeleteRecipeUsecase,
    UnitOfWorkForRecipes,
  ],
})
export class RecipesModule {}
