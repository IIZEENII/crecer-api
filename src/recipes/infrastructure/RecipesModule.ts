import { Module } from '@nestjs/common';
import { RecipesService } from './RecipesSservice';
import { RecipesController } from './RecipesController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeCreator } from '../application/RecipeCreator';
import { RecipeFinder } from '../application/RecipeFinder';
import { Recipe } from '../domain/Recipe';
import { RecipeUpdater } from '../application/RecipeUpdater';
import { UnitOfWorkForRecipes } from 'src/shared/infrastructure/unit-of-work/UnitOfWorkForRecipes';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  controllers: [RecipesController],
  providers: [
    RecipesService,
    RecipeCreator,
    RecipeFinder,
    RecipeUpdater,
    UnitOfWorkForRecipes,
  ],
})
export class RecipesModule {}
