import { Injectable } from '@nestjs/common';
import { Ingredient } from '@src/ingredients/entities/ingredient';
import { RecipeVariant } from '../entities/RecipeVariant';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IngredientAgregatorForRecipeVariant {
  constructor(
    @InjectRepository(RecipeVariant)
    private readonly recipeVariantRepository: Repository<RecipeVariant>,
  ) {}

  async add(recipeVariant: RecipeVariant, ingredients: Ingredient[]) {
    try {
      return this.tryToAdd(recipeVariant, ingredients);
    } catch (error) {
      console.log(error);
    }
  }

  private async tryToAdd(
    recipeVariant: RecipeVariant,
    ingredients: Ingredient[],
  ): Promise<void> {
    //TODO: validate if ingredient alredy exists in recipe Variant: Not sure
    recipeVariant.ingredients.push(...ingredients);
    await this.recipeVariantRepository.save(recipeVariant);
  }
}
