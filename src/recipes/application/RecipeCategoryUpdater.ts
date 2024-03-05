import { Injectable } from '@nestjs/common';
import { UnitOfWorkForRecipes } from 'src/shared/infrastructure/unit-of-work/UnitOfWorkForRecipes';
import { UpdateRecipeCategoryDto } from '../infrastructure/dtos/UpdateRecipeCategory.dto';
import { Product } from '@src/products/domain/Product';
import { RecipeVariant } from '@src/recipe-variants/domain/RecipeVariant';
import { Categories } from '@src/shared/domain/Categories';
import { RecipeFinderJoinedToRecipeVariantsAndProducts } from './RecipeFinderJoinedToRecipeVariantsAndProducts';

@Injectable()
export class RecipeCategoryUpdater {
  constructor(
    private readonly unitOfWork: UnitOfWorkForRecipes,
    private readonly recipeFinderJoinedToRecipeVariantsAndProducts: RecipeFinderJoinedToRecipeVariantsAndProducts,
  ) {}

  async update(
    id: string,
    updateRecipeCategoryDto: UpdateRecipeCategoryDto,
  ): Promise<void> {
    try {
      this.tryToUpdate(id, updateRecipeCategoryDto);
    } catch (error) {
      console.log(error);
      this.unitOfWork.rollbackTransaction();
    }
  }

  private async tryToUpdate(
    id: string,
    { category }: UpdateRecipeCategoryDto,
  ): Promise<void> {
    this.unitOfWork.beginTransaction();

    const recipe =
      await this.recipeFinderJoinedToRecipeVariantsAndProducts.findById(id);

    await this.unitOfWork.recipeRepository.update(id, {
      category: category,
    });

    const productsWithNewCategoryApplied = this.applyCategoryToProducts(
      this.extractProductsToRecipeVariants(recipe.variants),
      category,
    );

    this.unitOfWork.productRepository.upsert(productsWithNewCategoryApplied, {
      conflictPaths: ['id'],
    });

    this.unitOfWork.commitTransaction();
  }

  private extractProductsToRecipeVariants(
    recipeVariants: RecipeVariant[],
  ): Product[] {
    return recipeVariants.map((recipeVariant) => recipeVariant.product);
  }

  private applyCategoryToProducts(
    products: Product[],
    category: Categories,
  ): Product[] {
    return products.map((product) => {
      return { category, ...product };
    });
  }
}
