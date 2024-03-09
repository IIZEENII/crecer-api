import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../domain/Ingredient';
import { Repository } from 'typeorm';
import { UpdateIngredientDto } from '../infrastructure/dtos/UpdateIngredient.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class IngredientUpdater {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async update(
    ingredient: Ingredient,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<void> {
    try {
      return this.tryToUpdate(ingredient, updateIngredientDto);
    } catch (error) {
      console.log(error);
    }
  }

  private async tryToUpdate(
    ingredient: Ingredient,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<void> {
    if (this.isIngredientInRecipeVariants(ingredient)) {
      throw new BadRequestException(
        'cannot be updated unit type, ingredient is in some recipes.',
      );
    }

    if (!updateIngredientDto?.unitType) {
      updateIngredientDto.unitType = ingredient.unitType;
    }

    await this.ingredientRepository.update(ingredient.id, updateIngredientDto);
  }

  private isIngredientInRecipeVariants(ingredient: Ingredient): boolean {
    return ingredient.recipeVariants.length > 0;
  }
}
