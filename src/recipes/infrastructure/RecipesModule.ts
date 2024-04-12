import { Module } from '@nestjs/common';
import { RecipesController } from './RecipesController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeCreator } from '../application/RecipeCreator';
import { RecipeFinder } from '../application/RecipeFinder';
import { Recipe } from '../domain/Recipe';
import { RecipeUpdater } from '../application/RecipeUpdater';
import { UnitOfWorkForRecipes } from '@src/shared/infrastructure/unitOfWork/UnitOfWorkForRecipes';
import { RecipeDeleter } from '../application/RecipeDeleter';
import { RecipeVariantsModule } from '@src/recipe-variants/infrastructure/RecipeVariantsModule';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), RecipeVariantsModule],
  controllers: [RecipesController],
  providers: [
    RecipeCreator,
    RecipeFinder,
    RecipeUpdater,
    RecipeDeleter,
    UnitOfWorkForRecipes,
  ],
})
export class RecipesModule {}
