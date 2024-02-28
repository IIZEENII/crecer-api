import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecipeVariantsService } from './recipe-variants.service';
import { RecipeVariantCopyNameDto } from './dtos/recipe-variant-copy-name.dto';
import { RecipeVariant } from '../domain/recipe-variant';

@Controller('recipe-variants')
export class RecipeVariantsController {
  constructor(private readonly recipeVariantsService: RecipeVariantsService) {}

  @Post(':id')
  async cloneVariant(
    @Param('id') originalRecipeVariantId: string,
    @Body() recipeVariantCopyNameDto: RecipeVariantCopyNameDto,
  ): Promise<void> {
    this.recipeVariantsService.copy(
      originalRecipeVariantId,
      recipeVariantCopyNameDto,
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<RecipeVariant> {
    return this.recipeVariantsService.findById(id);
  }

  @Get()
  async findAll(): Promise<RecipeVariant[]> {
    return this.recipeVariantsService.findAll();
  }
}
