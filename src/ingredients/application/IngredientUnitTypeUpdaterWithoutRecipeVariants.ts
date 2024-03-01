import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateIngredientUnitTypeDto } from '../infrastructure/dtos/UpdateIngredientUnitTypeDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../domain/Ingredient';
import { IngredientFinderJoinedToRecipeVariants } from './IngredientFinderWithRecipeVariants';

@Injectable()
export class IngredientUnitTypeUpdaterWithoutRecipeVariants {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    private readonly ingredientFinderJoinedToRecipeVariants: IngredientFinderJoinedToRecipeVariants,
  ) {}

  async update(
    id: string,
    updateIngredientUnitTypeDto: UpdateIngredientUnitTypeDto,
  ): Promise<void> {
    try {
      await this.tryToUpdate(id, updateIngredientUnitTypeDto);
    } catch (error) {
      console.log(error);
    }
  }

  private async tryToUpdate(
    id: string,
    updateIngredientUnitTypeDto: UpdateIngredientUnitTypeDto,
  ) {
    const ingredient =
      await this.ingredientFinderJoinedToRecipeVariants.findById(id);

    if (!this.isIngredientInRecipeVariants(ingredient)) {
      this.ingredientRepository.update(id, updateIngredientUnitTypeDto);
    }

    throw new BadRequestException();
  }

  private isIngredientInRecipeVariants(ingredient: Ingredient): boolean {
    return ingredient.recipeVariants.length > 0;
  }
}
