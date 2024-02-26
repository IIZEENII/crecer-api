import { Injectable } from '@nestjs/common';
import { RecipeVariantCreator } from '../application/recipe-variant-creator';
import { CreateRecipeVariantDto } from './dtos/create-recipe-variant.dto';
import { RecipeVariantCopier } from '../application/recipe-variant-copier';
import { RecipeVariantCopyNameDto } from './dtos/recipe-variant-copy-name.dto';

@Injectable()
export class RecipeVariantsService {
  constructor(
    private readonly recipeVariantCreator: RecipeVariantCreator,
    private readonly recipeVariantCopier: RecipeVariantCopier,
  ) {}

  async create(createRecipeVariantDto: CreateRecipeVariantDto): Promise<void> {
    this.recipeVariantCreator.create(createRecipeVariantDto);
  }

  async copy(
    originalRecipeVariantId: string,
    createRecipeVariantCloneDto: RecipeVariantCopyNameDto,
  ): Promise<void> {
    this.recipeVariantCopier.copy(
      originalRecipeVariantId,
      createRecipeVariantCloneDto,
    );
  }
}
