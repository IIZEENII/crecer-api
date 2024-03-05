import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateIngredientUnitTypeDto } from '../infrastructure/dtos/UpdateIngredientUnitType.dto';
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
      return await this.tryToUpdate(id, updateIngredientUnitTypeDto);
    } catch (error) {
      console.log(error);
    }
  }

  private async tryToUpdate(
    id: string,
    updateIngredientUnitTypeDto: UpdateIngredientUnitTypeDto,
  ): Promise<void> {
    const ingredient =
      await this.ingredientFinderJoinedToRecipeVariants.findById(id);
    console.log(ingredient);
    if (this.isIngredientInRecipeVariants(ingredient)) {
      throw new BadRequestException();
    }
    this.ingredientRepository.update(id, updateIngredientUnitTypeDto);
  }

  private isIngredientInRecipeVariants(ingredient: Ingredient): boolean {
    return ingredient.recipeVariants ? true : false;
  }
}
