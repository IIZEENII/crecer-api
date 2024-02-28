import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { IngredientCreator } from '../application/ingredient-creator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from '../domain/ingredient';
import { IngredientFinder } from '../application/ingredient-finder';
import { IngredientUpdater } from '../application/ingredient-updater';
import { UnitOfWorkForRecipes } from 'src/shared/infrastructure/unit-of-work/unit-of-work-for-recipes';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  controllers: [IngredientsController],
  providers: [
    IngredientsService,
    IngredientCreator,
    IngredientFinder,
    IngredientUpdater,
    UnitOfWorkForRecipes,
  ],
})
export class IngredientsModule {}
