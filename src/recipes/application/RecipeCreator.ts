import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from '../infrastructure/dtos/CreateRecipe.dto';
import { UnitOfWorkForRecipes } from 'src/shared/infrastructure/unit-of-work/UnitOfWorkForRecipes';

@Injectable()
export class RecipeCreator {
  private static firstRecipeVariantName = 'variante-1';

  constructor(private readonly unitOfWork: UnitOfWorkForRecipes) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<void> {
    try {
      this.tryToCreate(createRecipeDto);
    } catch (error) {
      console.log(error);
      await this.unitOfWork.rollbackTransaction();
    }
  }
  // TODO: validate if recipe name alredy exists, set name as unique on recipe entity
  async tryToCreate(createRecipeDto: CreateRecipeDto): Promise<void> {
    await this.unitOfWork.beginTransaction();

    const recipeCreated =
      this.unitOfWork.recipeRepository.create(createRecipeDto);

    await this.unitOfWork.recipeRepository.save(recipeCreated);

    const defaultRecipeVariantCreated =
      this.unitOfWork.recipeVariantRepository.create({
        name: RecipeCreator.firstRecipeVariantName,
        recipe: recipeCreated,
      });

    await this.unitOfWork.recipeVariantRepository.save(
      defaultRecipeVariantCreated,
    );

    const defaultProductCreated = this.unitOfWork.productRepository.create({
      name: RecipeCreator.firstRecipeVariantName,
      category: recipeCreated.category,
      recipeVariant: defaultRecipeVariantCreated,
    });

    await this.unitOfWork.productRepository.save(defaultProductCreated);
    await this.unitOfWork.commitTransaction();
  }
}
