import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../entities/ingredient';

@Injectable()
export class DeleteIngredientWithoutRecipeVariantsUsecase {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async execute(ingredient: Ingredient) {
    try {
      return this.tryToExecute(ingredient);
    } catch (error) {
      console.log(error);
    }
  }

  private async tryToExecute(ingredient: Ingredient) {
    if (this.isIngredientInRecipeVariants(ingredient)) {
      throw new BadRequestException(
        'cannot be deleted, ingredient is in some recipes.',
      );
    }

    await this.ingredientRepository.remove(ingredient);
  }

  private isIngredientInRecipeVariants(ingredient: Ingredient): boolean {
    return ingredient.recipeVariants.length > 0;
  }
}
