import { InjectRepository } from '@nestjs/typeorm';
import { RecipeVariant } from '../domain/RecipeVariant';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientRemoverToRecipeVariant {
  constructor(
    @InjectRepository(RecipeVariant)
    private readonly recipeVariantRepository: Repository<RecipeVariant>,
  ) {}

  async remove(recipeVariant: RecipeVariant, ingredientId: string) {
    const ingredients = recipeVariant.ingredients.filter(
      (ingredient) => ingredient.id != ingredientId,
    );

    recipeVariant.ingredients = ingredients;

    await this.recipeVariantRepository.save(recipeVariant);
  }
}
