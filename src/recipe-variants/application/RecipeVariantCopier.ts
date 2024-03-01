import { RecipeVariant } from '../domain/RecipeVariant';
import { Injectable } from '@nestjs/common';
import { RecipeVariantCopyNameDto } from '../infrastructure/dtos/RecipeVariantCopyNameDto';
import { UnitOfWorkForRecipes } from 'src/shared/infrastructure/unit-of-work/UnitOfWorkForRecipes';

@Injectable()
export class RecipeVariantCopier {
  constructor(private readonly unitOfWork: UnitOfWorkForRecipes) {}

  async copy(
    originalRecipeVariantId: string,
    recipeVariantCopyNameDto: RecipeVariantCopyNameDto,
  ): Promise<void> {
    try {
      await this.unitOfWork.beginTransaction();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...recipeVariantCopy } = await this.findOriginalRecipeVariant(
        originalRecipeVariantId,
      );
      recipeVariantCopy.name = recipeVariantCopyNameDto.name;

      await this.unitOfWork.recipeVariantRepository.save(recipeVariantCopy);

      await this.unitOfWork.productRepository.insert({
        name: recipeVariantCopy.name,
        category: recipeVariantCopy.recipe.category,
        recipeVariant: recipeVariantCopy,
      });

      await this.unitOfWork.commitTransaction();
    } catch (error) {
      console.log(error);
      this.unitOfWork.rollbackTransaction();
    }
  }

  async findOriginalRecipeVariant(id: string): Promise<RecipeVariant> {
    return this.unitOfWork.recipeVariantRepository.findOneBy({ id });
  }
}
