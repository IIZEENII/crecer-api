import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from '../infrastructure/dtos/CreateRecipe.dto';
import { UnitOfWorkForRecipes } from '@src/shared/infrastructure/unitOfWork/UnitOfWorkForRecipes';

@Injectable()
export class RecipeCreator {
  private static firstRecipeVariantName = 'variante-1';

  constructor(private readonly unitOfWork: UnitOfWorkForRecipes) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<void> {
    try {
      return this.tryToCreate(createRecipeDto);
    } catch (error) {
      console.log(error);
      await this.unitOfWork.rollbackTransaction();
    }
  }

  async tryToCreate(createRecipeDto: CreateRecipeDto): Promise<void> {
    await this.unitOfWork.beginTransaction();

    const recipeCreated =
      await this.unitOfWork.recipeRepository.save(createRecipeDto);

    const recipeVariantCreated =
      await this.unitOfWork.recipeVariantRepository.save({
        name: RecipeCreator.firstRecipeVariantName,
        recipe: recipeCreated,
      });

    await this.unitOfWork.productRepository.insert({
      name: RecipeCreator.firstRecipeVariantName,
      recipeVariant: recipeVariantCreated,
    });

    await this.unitOfWork.commitTransaction();
  }
}
