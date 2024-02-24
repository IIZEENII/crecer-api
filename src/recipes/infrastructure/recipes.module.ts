import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeCreator } from '../application/recipe-creator';
import { RecipeFinder } from '../application/recipe-finder';
import { Recipe } from '../domain/recipe';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  controllers: [RecipesController],
  providers: [RecipesService, RecipeCreator, RecipeFinder],
})
export class RecipesModule {}
