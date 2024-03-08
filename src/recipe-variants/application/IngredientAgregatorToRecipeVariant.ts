import { Injectable } from '@nestjs/common';
import { AddIngredientsByIdDto } from '../infrastructure/dtos/AddIngredientById.dto';
import { UnitOfWorkForRecipes } from '@src/shared/infrastructure/unit-of-work/UnitOfWorkForRecipes';
import { Ingredient } from '@src/ingredients/domain/Ingredient';
import { RecipeVariantFinder } from './RecipeVariantFinder';

@Injectable()
export class IngredientAgregatorToRecipeVariant {
  constructor(
    private readonly recipeVariantFinder: RecipeVariantFinder,
    private readonly unitOfWork: UnitOfWorkForRecipes,
  ) {}

  async add(id: string, { ingredientIds }: AddIngredientsByIdDto) {
    try {
      return this.tryToAdd(id, ingredientIds);
    } catch (error) {
      console.log(error);
      await this.unitOfWork.rollbackTransaction();
    }
  }

  private async tryToAdd(id: string, ingredientIds: string[]) {
    await this.unitOfWork.beginTransaction();

    const recipeVariantFound = await this.recipeVariantFinder.findById(id);

    const ingredientsFound = await this.findIngredientsByIds(ingredientIds);

    recipeVariantFound.ingredients.push(...ingredientsFound);

    await this.unitOfWork.recipeVariantRepository.save(recipeVariantFound);

    await this.unitOfWork.commitTransaction();
  }

  // TODO: apply SRP
  private async findIngredientsByIds(
    ingredientIds: string[],
  ): Promise<Ingredient[]> {
    return this.unitOfWork.ingredientRepository
      .createQueryBuilder('ingredient')
      .where('ingredient.id IN (:...ids)', { ids: ingredientIds })
      .getMany();
  }
}
