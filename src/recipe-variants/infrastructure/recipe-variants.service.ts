import { Injectable } from '@nestjs/common';
import { RecipeVariantCopier } from '../application/recipe-variant-copier';
import { RecipeVariantCopyNameDto } from './dtos/recipe-variant-copy-name.dto';
import { RecipeVariantFinder } from '../application/recipe-variant-finder';
import { RecipeVariant } from '../domain/recipe-variant';

@Injectable()
export class RecipeVariantsService {
  constructor(
    private readonly recipeVariantCopier: RecipeVariantCopier,
    private readonly recipeVariantFinder: RecipeVariantFinder,
  ) {}

  async copy(
    originalRecipeVariantId: string,
    createRecipeVariantCloneDto: RecipeVariantCopyNameDto,
  ): Promise<void> {
    const originalRecipeVariant =
      await this.recipeVariantFinder.findWithRecipeJoined(
        originalRecipeVariantId,
      );
    this.recipeVariantCopier.copy(
      originalRecipeVariant,
      createRecipeVariantCloneDto,
    );
  }

  async findById(id: string): Promise<RecipeVariant> {
    return this.recipeVariantFinder.findById(id);
  }

  async findAll(): Promise<RecipeVariant[]> {
    return this.recipeVariantFinder.findAll();
  }
}
