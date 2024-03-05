import { Module } from '@nestjs/common';
import { RecipesService } from './RecipesSservice';
import { RecipesController } from './RecipesController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeCreator } from '../application/RecipeCreator';
import { RecipeFinder } from '../application/RecipeFinder';
import { Recipe } from '../domain/Recipe';
import { RecipeCategoryUpdater } from '../application/RecipeCategoryUpdater';
import { UnitOfWorkForRecipes } from 'src/shared/infrastructure/unit-of-work/UnitOfWorkForRecipes';
import { RecipeFinderJoinedToRecipeVariantsAndProducts } from '../application/RecipeFinderJoinedToRecipeVariantsAndProducts';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  controllers: [RecipesController],
  providers: [
    RecipesService,
    RecipeCreator,
    RecipeFinder,
    RecipeCategoryUpdater,
    UnitOfWorkForRecipes,
    RecipeFinderJoinedToRecipeVariantsAndProducts,
  ],
})
export class RecipesModule {}
