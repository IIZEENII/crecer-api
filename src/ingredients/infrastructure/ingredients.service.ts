import { Injectable } from '@nestjs/common';
import { IngredientCreator } from '../application/ingredient-creator';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { IngredientFinder } from '../application/ingredient-finder';
import { Ingredient } from '../domain/ingredient';
import { IngredientUpdater } from '../application/ingredient-updater';
import { UpdateIngredientUnitTypeDto } from './dtos/update-ingredient-unit-type.dto';

@Injectable()
export class IngredientsService {
  constructor(
    private readonly ingredientCreator: IngredientCreator,
    private readonly ingredientFinder: IngredientFinder,
    private readonly ingredientUpdater: IngredientUpdater,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<void> {
    this.ingredientCreator.create(createIngredientDto);
  }

  async findById(id: string): Promise<Ingredient> {
    return this.ingredientFinder.findById(id);
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientFinder.findAll();
  }

  async updateIngredientUnitTypeIfNotInRecipeVariants(
    id: string,
    updateIngredientUnitTypeDto: UpdateIngredientUnitTypeDto,
  ): Promise<void> {
    this.ingredientUpdater.updateIngredientUnitTypeIfNotInRecipeVariants(
      id,
      updateIngredientUnitTypeDto,
    );
  }
}
