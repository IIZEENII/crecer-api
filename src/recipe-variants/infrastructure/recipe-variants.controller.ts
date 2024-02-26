import { Body, Controller, Param, Post } from '@nestjs/common';
import { RecipeVariantsService } from './recipe-variants.service';
import { CreateRecipeVariantCloneDto } from './dtos/create-recipe-variant-clone.dto';

@Controller('recipe-variants')
export class RecipeVariantsController {
  constructor(private readonly recipeVariantsService: RecipeVariantsService) {}

  @Post(':id')
  async cloneVariant(
    @Param('id') idOfVariantToClone: string,
    @Body() cloneRecipeVariantDto: CreateRecipeVariantCloneDto,
  ): Promise<void> {
    this.recipeVariantsService.clone(idOfVariantToClone, cloneRecipeVariantDto);
  }
}
