import { Body, Controller, Post } from '@nestjs/common';
import { RecipeVariantsService } from './recipe-variants.service';
import { CreateRecipeVariantDto } from './dtos/create-recipe-variant.dto';

@Controller('recipe-variants')
export class RecipeVariantsController {
  constructor(private readonly recipeVariantsService: RecipeVariantsService) {}

  @Post()
  async create(
    @Body() createRecipeVariantDto: CreateRecipeVariantDto,
  ): Promise<void> {
    this.recipeVariantsService.create(createRecipeVariantDto);
  }
}
