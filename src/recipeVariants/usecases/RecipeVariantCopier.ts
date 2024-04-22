import { Injectable } from '@nestjs/common';
import { CopyRecipeVariantDto } from '../dtos/CopyRecipeVariant.dto';
import { UnitOfWorkForRecipes } from '@src/shared/infrastructure/unitOfWork/UnitOfWorkForRecipes';
import { RecipeVariant } from '../entities/RecipeVariant';

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

    const newRecipeVariant = await this.unitOfWork.recipeVariantRepository.save(
      originalRecipeVariant,
    );

    await this.unitOfWork.productRepository.insert({
      name: originalRecipeVariant.name,
      recipeVariant: newRecipeVariant,
    });

    await this.unitOfWork.commitTransaction();
  }
}
