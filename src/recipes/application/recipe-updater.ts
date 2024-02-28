import { Injectable } from '@nestjs/common';
import { UnitOfWorkForRecipes } from 'src/shared/infrastructure/unit-of-work/unit-of-work-for-recipes';
import { UpdateRecipeCategoryDto } from '../infrastructure/dtos/update-recipe-category.dto';
import { Recipe } from '../domain/recipe';
import { Product } from 'src/products/domain/product';

@Injectable()
export class RecipeUpdater {
  constructor(private readonly unitOfWork: UnitOfWorkForRecipes) {}
  async updateCategory(
    recipe: Recipe,
    { category }: UpdateRecipeCategoryDto,
  ): Promise<void> {
    try {
      this.unitOfWork.beginTransaction();

      this.unitOfWork.recipeRepository.update(recipe.id, {
        category,
      });

      // TODO: refactor code because this does not comply with the single responsibility
      const products: Product[] = [];

      for (const variant of recipe.variants) {
        variant.product.category = category;
        products.push(variant.product);
      }

      this.unitOfWork.productRepository.upsert(products, {
        conflictPaths: ['id'],
      });

      this.unitOfWork.commitTransaction();
    } catch (error) {
      console.log(error);
      this.unitOfWork.rollbackTransaction();
    }
  }
}
