import { Body, Controller, Param, Post } from '@nestjs/common';
import { RecipeVariantsService } from './recipe-variants.service';
import { CreateRecipeVariantDto } from './dtos/create-recipe-variant.dto';

@Controller('recipe-variants')
export class RecipeVariantsController {
  constructor(private readonly recipeVariantsService: RecipeVariantsService) {}

  // TODO: replace method for copy
  @Post()
  async create(
    @Body() createRecipeVariantDto: CreateRecipeVariantDto,
  ): Promise<void> {
    this.recipeVariantsService.create(createRecipeVariantDto);
  }

  @Post('/copy/:id')
  async cloneVariant(
    @Param('id') idOfTheReferenceToClone: string,
  ): Promise<void> {
    this.recipeVariantsService.cloneVariant(idOfTheReferenceToClone);
  }
}
