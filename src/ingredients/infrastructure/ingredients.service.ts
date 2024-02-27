import { Injectable } from '@nestjs/common';
import { IngredientCreator } from '../application/ingredient-creator';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { IngredientFinder } from '../application/ingredient-finder';
import { Ingredient } from '../domain/ingredient';
import { SafeIngredientUpdaterForMeasurementUnit } from '../application/safe-ingredient-updater-for-measurement-unit';
import { UpdateIngredientMeasurementDto } from './dtos/update-ingredient-measurement-unit.dto';

@Injectable()
export class IngredientsService {
  constructor(
    private readonly ingredientCreator: IngredientCreator,
    private readonly ingredientFinder: IngredientFinder,
    private readonly safeIngredientUpdaterForMeasurementUnit: SafeIngredientUpdaterForMeasurementUnit,
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

  async updateMeasurementUnit(
    id: string,
    updateIngredientMeasurementDto: UpdateIngredientMeasurementDto,
  ): Promise<void> {
    const ingredient = await this.ingredientFinder.findById(id);
    this.safeIngredientUpdaterForMeasurementUnit.updateMeasurementUnit(
      ingredient,
      updateIngredientMeasurementDto,
    );
  }
}
