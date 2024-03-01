import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from '../infrastructure/dtos/CreateRecipeDto';
import { UnitOfWorkForRecipes } from 'src/shared/infrastructure/unit-of-work/UnitOfWorkForRecipes';

@Injectable()
export class RecipeCreator {
  constructor(private readonly unitOfWork: UnitOfWorkForRecipes) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<void> {
    try {
      await this.unitOfWork.beginTransaction();

      const recipeCreated =
        this.unitOfWork.recipeRepository.create(createRecipeDto);

      await this.unitOfWork.recipeRepository.save(recipeCreated);

      const defaultRecipeVariantCreated =
        this.unitOfWork.recipeVariantRepository.create({
          name: 'variante_1',
          recipe: recipeCreated,
        });

      await this.unitOfWork.recipeVariantRepository.save(
        defaultRecipeVariantCreated,
      );

      const defaultProductCreated = this.unitOfWork.productRepository.create({
        name: defaultRecipeVariantCreated.name,
        category: recipeCreated.category,
        recipeVariant: defaultRecipeVariantCreated,
      });

      await this.unitOfWork.productRepository.save(defaultProductCreated);
      await this.unitOfWork.commitTransaction();
    } catch (error) {
      await this.unitOfWork.rollbackTransaction();
      console.log(error);
    }
  }
}
