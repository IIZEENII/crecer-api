import { Injectable } from '@nestjs/common';
import { UnitOfWorkForRecipes } from '@src/shared/infrastructure/unitOfWork/UnitOfWorkForRecipes';
import { UpdateRecipeDto } from '../infrastructure/dtos/UpdateRecipe.dto';
import { Recipe } from '../domain/Recipe';

@Injectable()
export class RecipeUpdater {
  constructor(private readonly unitOfWork: UnitOfWorkForRecipes) {}

  async update(
    recipe: Recipe,
    updateRecipeCategoryDto: UpdateRecipeDto,
  ): Promise<void> {
    try {
      return this.tryToUpdate(recipe, updateRecipeCategoryDto);
    } catch (error) {
      console.error(error);
      this.unitOfWork.rollbackTransaction();
    }
  }

  private async tryToUpdate(
    recipe: Recipe,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<void> {
    this.unitOfWork.beginTransaction();
    await this.unitOfWork.recipeRepository.update(recipe.id, updateRecipeDto);
    this.unitOfWork.commitTransaction();
  }
}
