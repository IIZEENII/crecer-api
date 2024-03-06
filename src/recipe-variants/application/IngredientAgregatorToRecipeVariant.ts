import { Injectable } from '@nestjs/common';
import { AddIngredientsByIdDto } from '../infrastructure/dtos/AddIngredientById.dto';
import { Ingredient } from '@src/ingredients/domain/Ingredient';
import { UnitOfWorkForRecipes } from '@src/shared/infrastructure/unit-of-work/UnitOfWorkForRecipes';

@Injectable()
export class IngredientAgregatorToRecipeVariant {
  constructor(private readonly unitOfWork: UnitOfWorkForRecipes) {}

  async add(
    id: string,
    { ingredientIds }: AddIngredientsByIdDto,
  ): Promise<void> {
    // TODO: insert data to across from recipe_variants_and_ingredients
    await this.unitOfWork.beginTransaction();
    const recipeVariant = await this.unitOfWork.recipeVariantRepository
      .createQueryBuilder('recipeVariant')
      .where('recipeVariant.id = :id', { id })
      .getOne();

    await this.unitOfWork.ingredientRepository
      .createQueryBuilder('ingredient')
      .update(Ingredient)
      .set({ recipeVariants: [recipeVariant] })
      .where('ingredient.id = :id', { id: ingredientIds[0] })
      .execute();
    await this.unitOfWork.commitTransaction();
  }
}
