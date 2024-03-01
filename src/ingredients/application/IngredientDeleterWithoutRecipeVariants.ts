import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../domain/Ingredient';
import { IngredientFinderJoinedToRecipeVariants } from './IngredientFinderWithRecipeVariants';

@Injectable()
export class IngredientDeleterWithoutRecipeVariants {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    private readonly ingredientFinderJoinedToRecipeVariants: IngredientFinderJoinedToRecipeVariants,
  ) {}

  async delete(id: string): Promise<void> {
    try {
      this.tryToDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  private async tryToDelete(id: string) {
    const ingredient =
      await this.ingredientFinderJoinedToRecipeVariants.findById(id);

    if (!this.isIngredientInRecipeVariants(ingredient)) {
      await this.ingredientRepository.delete({ id });
    }

    throw new BadRequestException();
  }

  private isIngredientInRecipeVariants(ingredient: Ingredient): boolean {
    return ingredient.recipeVariants.length > 0;
  }
}
