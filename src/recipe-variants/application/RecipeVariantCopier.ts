import { Injectable } from '@nestjs/common';
import { RecipeVariantCopyNameDto } from '../infrastructure/dtos/RecipeVariantCopyName.dto';
import { UnitOfWorkForRecipes } from 'src/shared/infrastructure/unit-of-work/UnitOfWorkForRecipes';
import { RecipeVariantFinderJoinedToRecipe } from './RecipeVariantsFinderJoinedToRecipe';

@Injectable()
export class RecipeVariantCopier {
  constructor(
    private readonly unitOfWork: UnitOfWorkForRecipes,
    private readonly recipeVariantFinderJoinedToRecipe: RecipeVariantFinderJoinedToRecipe,
  ) {}

  async copy(
    originalRecipeVariantId: string,
    recipeVariantCopyNameDto: RecipeVariantCopyNameDto,
  ): Promise<void> {
    try {
      await this.tryToCopy(originalRecipeVariantId, recipeVariantCopyNameDto);
    } catch (error) {
      console.log(error);
      this.unitOfWork.rollbackTransaction();
    }
  }

  async tryToCopy(
    originalRecipeVariantId: string,
    recipeVariantCopyNameDto: RecipeVariantCopyNameDto,
  ): Promise<void> {
    await this.unitOfWork.beginTransaction();

    const recipeVariantCopy =
      await this.recipeVariantFinderJoinedToRecipe.findById(
        originalRecipeVariantId,
      );

    delete recipeVariantCopy.id;
    recipeVariantCopy.name = recipeVariantCopyNameDto.name;

    await this.unitOfWork.recipeVariantRepository.save(recipeVariantCopy);

    await this.unitOfWork.productRepository.insert({
      name: recipeVariantCopy.name,
      category: recipeVariantCopy.recipe.category,
      recipeVariant: recipeVariantCopy,
    });

    await this.unitOfWork.commitTransaction();
  }
}
