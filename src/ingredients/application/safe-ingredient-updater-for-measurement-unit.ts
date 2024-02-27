import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../domain/ingredient';
import { Repository } from 'typeorm';
import { UpdateIngredientMeasurementDto } from '../infrastructure/dtos/update-ingredient-measurement-unit.dto';

@Injectable()
export class SafeIngredientUpdaterForMeasurementUnit {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async updateMeasurementUnit(
    ingredient: Ingredient,
    updateIngredientMeasurementDto: UpdateIngredientMeasurementDto,
  ): Promise<void> {
    if (!this.ingredientHasAssociatedRecipeVariants(ingredient)) {
      this.ingredientRepository.update(
        ingredient.id,
        updateIngredientMeasurementDto,
      );
    }
    //TODO: throw exeption
  }

  private ingredientHasAssociatedRecipeVariants(
    ingredient: Ingredient,
  ): boolean {
    //TODO: ensure if the query include inner join with variants
    return ingredient.recipeVariants.length > 0;
  }
}
