import { Injectable } from '@nestjs/common';
import { UnitOfWorkForRecipes } from '@src/shared/infrastructure/unitOfWork/UnitOfWorkForRecipes';
import { UpdateRecipeDto } from '../dtos/UpdateRecipe.dto';
import { Recipe } from '../entities/recipe';

@Injectable()
export class UpdateRecipeUsecase {
  constructor(private readonly unitOfWork: UnitOfWorkForRecipes) {}

  async execute(
    recipe: Recipe,
    updateRecipeCategoryDto: UpdateRecipeDto,
  ): Promise<void> {
    try {
      return this.tryToExecute(recipe, updateRecipeCategoryDto);
    } catch (error) {
      console.error(error);
      this.unitOfWork.rollbackTransaction();
    }
  }

  private async tryToExecute(
    recipe: Recipe,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<void> {
    this.unitOfWork.beginTransaction();
    await this.unitOfWork.recipeRepository.update(recipe.id, updateRecipeDto);
    this.unitOfWork.commitTransaction();
  }
}
