import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../entities/ingredient';
import { Repository } from 'typeorm';
import { UpdateIngredientDto } from '../dtos/UpdateIngredient.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateIngredientUsecase {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async execute(
    ingredient: Ingredient,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<void> {
    try {
      return this.tryToExecute(ingredient, updateIngredientDto);
    } catch (error) {
      console.log(error);
    }
  }

  private async tryToExecute(
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
