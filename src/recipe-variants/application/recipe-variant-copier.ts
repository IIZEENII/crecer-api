import { RecipeVariant } from '../domain/recipe-variant';
import { Injectable } from '@nestjs/common';
import { RecipeVariantCopyNameDto } from '../infrastructure/dtos/recipe-variant-copy-name.dto';
import { UnitOfWorkForRecipes } from 'src/shared/infrastructure/unit-of-work/unit-of-work-for-recipes';

@Injectable()
export class RecipeVariantCopier {
  constructor(private readonly unitOfWork: UnitOfWorkForRecipes) {}

  async copy(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { id, ...recipeVariantCopy }: RecipeVariant,
    recipeVariantCopyNameDto: RecipeVariantCopyNameDto,
  ): Promise<void> {
    try {
      recipeVariantCopy.name = recipeVariantCopyNameDto.name;
      await this.unitOfWork.beginTransaction();
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
}
