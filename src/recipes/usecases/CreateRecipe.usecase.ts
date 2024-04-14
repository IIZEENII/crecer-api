import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from '../dtos/CreateRecipe.dto';
import { UnitOfWorkForRecipes } from '@src/shared/infrastructure/unitOfWork/UnitOfWorkForRecipes';

@Injectable()
export class CreateRecipeUsecase {
  private static firstRecipeVariantName = 'variante-1';

  constructor(private readonly unitOfWork: UnitOfWorkForRecipes) {}

  async execute(createRecipeDto: CreateRecipeDto): Promise<void> {
    try {
      return this.tryExecute(createRecipeDto);
    } catch (error) {
      console.error(error);
      await this.unitOfWork.rollbackTransaction();
    }
  }

  async tryExecute(createRecipeDto: CreateRecipeDto): Promise<void> {
    await this.unitOfWork.beginTransaction();

    const recipeCreated =
      await this.unitOfWork.recipeRepository.save(createRecipeDto);

    const recipeVariantCreated =
      await this.unitOfWork.recipeVariantRepository.save({
        name: CreateRecipeUsecase.firstRecipeVariantName,
        recipe: recipeCreated,
      });

    await this.unitOfWork.productRepository.insert({
      name: CreateRecipeUsecase.firstRecipeVariantName,
      recipeVariant: recipeVariantCreated,
    });

    await this.unitOfWork.commitTransaction();
  }
}
