import { Injectable } from '@nestjs/common';
import { UnitOfWorkForRecipes } from 'src/shared/infrastructure/unit-of-work/UnitOfWorkForRecipes';
import { UpdateRecipeDto } from '../infrastructure/dtos/UpdateRecipe.dto';
import { Product } from '@src/products/domain/Product';
import { RecipeVariant } from '@src/recipe-variants/domain/RecipeVariant';
import { Category } from '@src/shared/domain/Category';
import { Recipe } from '../domain/Recipe';

@Injectable()
export class RecipeUpdater {
  constructor(private readonly unitOfWork: UnitOfWorkForRecipes) {}

  async update(
    recipe: Recipe,
    updateRecipeCategoryDto: UpdateRecipeDto,
  ): Promise<void> {
    try {
      return this.tryToUpdate(recipe, updateRecipeCategoryDto);
    } catch (error) {
      console.log(error);
      this.unitOfWork.rollbackTransaction();
    }
  }

  private async tryToUpdate(
    recipe: Recipe,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<void> {
    this.unitOfWork.beginTransaction();

    if (!this.isCategoryEqualTo(recipe, updateRecipeDto.category)) {
      await this.updateRecipeAndProducts(recipe, updateRecipeDto.category);
    } else {
      await this.unitOfWork.recipeRepository.update(recipe.id, updateRecipeDto);
    }

    this.unitOfWork.commitTransaction();
  }

  private async updateRecipeAndProducts(
    recipe: Recipe,
    newCategory: Category,
  ): Promise<void> {
    await this.unitOfWork.recipeRepository.update(recipe.id, {
      category: newCategory,
    });

    const products = this.extractProductsFromVariants(recipe.variants);
    products.forEach((product) => (product.category = newCategory));

    await this.unitOfWork.productRepository.upsert(products, {
      conflictPaths: ['id'],
    });
  }

  private extractProductsFromVariants(variants: RecipeVariant[]): Product[] {
    return variants.map((variant) => variant.product);
  }

  private isCategoryEqualTo(recipe: Recipe, category: Category): boolean {
    return recipe.category === category;
  }
}
