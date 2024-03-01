import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecipeVariantCopyNameDto } from './dtos/RecipeVariantCopyNameDto';
import { RecipeVariant } from '../domain/RecipeVariant';
import { RecipeVariantFinder } from '../application/RecipeVariantFinder';
import { RecipeVariantCopier } from '../application/RecipeVariantCopier';

@Controller('recipe-variants')
export class RecipeVariantsController {
  constructor(
    private readonly recipeVariantFinder: RecipeVariantFinder,
    private readonly recipeVariantCopier: RecipeVariantCopier,
  ) {}

  @Post(':id')
  async cloneVariant(
    @Param('id') originalRecipeVariantId: string,
    @Body() recipeVariantCopyNameDto: RecipeVariantCopyNameDto,
  ): Promise<void> {
    this.recipeVariantCopier.copy(
      originalRecipeVariantId,
      recipeVariantCopyNameDto,
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<RecipeVariant> {
    return this.recipeVariantFinder.findById(id);
  }

  @Get()
  async findAll(): Promise<RecipeVariant[]> {
    return this.recipeVariantFinder.findAll();
  }
}
