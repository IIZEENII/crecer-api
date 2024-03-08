import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../domain/Ingredient';

@Injectable()
export class IngredientDeleterWithoutRecipeVariants {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async delete(ingredient: Ingredient) {
    try {
      return this.tryToDelete(ingredient);
    } catch (error) {
      console.log(error);
    }
  }

  private async tryToDelete(ingredient: Ingredient) {
    if (this.isIngredientInRecipeVariants(ingredient)) {
      throw new BadRequestException('ingredient is associated in some recipes');
    }

    await this.ingredientRepository.remove(ingredient);
  }

  private isIngredientInRecipeVariants(ingredient: Ingredient): boolean {
    return ingredient.recipeVariants.length > 0;
  }
}
