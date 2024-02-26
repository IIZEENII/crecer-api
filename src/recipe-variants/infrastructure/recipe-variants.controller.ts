import { Body, Controller, Post } from '@nestjs/common';
import { RecipeVariantsService } from './recipe-variants.service';
import { CloneRecipeVariantDto } from './dtos/clone-recipe-variant.dto';

@Controller('recipe-variants')
export class RecipeVariantsController {
  constructor(private readonly recipeVariantsService: RecipeVariantsService) {}

  @Post()
  async cloneVariant(
    @Body() cloneRecipeVariantDto: CloneRecipeVariantDto,
  ): Promise<void> {
    this.recipeVariantsService.cloneVariant(cloneRecipeVariantDto);
  }
}
