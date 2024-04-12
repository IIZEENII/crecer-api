import { Injectable } from '@nestjs/common';
import { CopyRecipeVariantDto } from '../infrastructure/dtos/CopyRecipeVariant.dto';
import { UnitOfWorkForRecipes } from '@src/shared/infrastructure/unitOfWork/UnitOfWorkForRecipes';
import { RecipeVariant } from '../domain/RecipeVariant';

@Injectable()
export class RecipeVariantCopier {
  constructor(private readonly unitOfWork: UnitOfWorkForRecipes) {}

  async copy(
    originalRecipeVariant: RecipeVariant,
    copyRecipeVariantDto: CopyRecipeVariantDto,
  ): Promise<void> {
    try {
      return await this.tryToCopy(originalRecipeVariant, copyRecipeVariantDto);
    } catch (error) {
      console.log(error);
      this.unitOfWork.rollbackTransaction();
    }
  }

  async tryToCopy(
    originalRecipeVariant: RecipeVariant,
    copyRecipeVariantDto: CopyRecipeVariantDto,
  ): Promise<void> {
    await this.unitOfWork.beginTransaction();

    delete originalRecipeVariant.id;
    originalRecipeVariant.name = copyRecipeVariantDto.nameOfCopy;

    await this.unitOfWork.recipeVariantRepository.save(originalRecipeVariant);

    await this.unitOfWork.productRepository.insert({
      name: originalRecipeVariant.name,
      category: originalRecipeVariant.recipe.category,
      recipeVariant: originalRecipeVariant,
    });

    await this.unitOfWork.commitTransaction();
  }
}
