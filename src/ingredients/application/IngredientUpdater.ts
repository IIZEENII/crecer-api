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
      throw new BadRequestException({
        message: [
          'not allowed update unit type when ingredient is in in some recipes.',
        ],
      });
    }

    // TODO: convert in a method to understand more the context
    if (!updateIngredientDto?.unitType) {
      updateIngredientDto.unitType = ingredient.unitType;
    }

    await this.ingredientRepository.update(ingredient.id, updateIngredientDto);
  }

  private isIngredientInRecipeVariants(ingredient: Ingredient): boolean {
    return ingredient.recipeVariants.length > 0;
  }
}
