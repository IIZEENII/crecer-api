import { Body, Controller, Param, Post } from '@nestjs/common';
import { RecipeVariantsService } from './recipe-variants.service';
import { RecipeVariantCopyNameDto } from './dtos/recipe-variant-copy-name.dto';

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
}
