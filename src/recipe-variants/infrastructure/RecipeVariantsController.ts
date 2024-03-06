import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RecipeVariantCopyNameDto } from './dtos/RecipeVariantCopyName.dto';
import { RecipeVariant } from '../domain/RecipeVariant';
import { RecipeVariantFinder } from '../application/RecipeVariantFinder';
import { RecipeVariantCopier } from '../application/RecipeVariantCopier';
import { IngredientAgregatorToRecipeVariant } from '../application/IngredientAgregatorToRecipeVariant';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { AddIngredientsByIdDto } from './dtos/AddIngredientById.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Recipe variants')
@Controller('recipe-variants')
export class RecipeVariantsController {
  constructor(
    private readonly recipeVariantFinder: RecipeVariantFinder,
    private readonly recipeVariantCopier: RecipeVariantCopier,
    private readonly ingredientAgregatorToRecipeVariant: IngredientAgregatorToRecipeVariant,
  ) {}

  @Post(':id/copy')
  async cloneVariant(
    @Param() { id: originalRecipeVariantId }: IdParam,
    @Body() recipeVariantCopyNameDto: RecipeVariantCopyNameDto,
  ): Promise<void> {
    this.recipeVariantCopier.copy(
      originalRecipeVariantId,
      recipeVariantCopyNameDto,
    );
  }

  @Get()
  async findAll(): Promise<RecipeVariant[]> {
    return this.recipeVariantFinder.findAll();
  }

  @Get(':id')
  async findById(@Param() { id }: IdParam): Promise<RecipeVariant> {
    return this.recipeVariantFinder.findById(id);
  }

  @Patch(':id/add-ingredients')
  async addIngredients(
    @Param() { id }: IdParam,
    @Body() addIngredientsByIdDto: AddIngredientsByIdDto,
  ): Promise<void> {
    return this.ingredientAgregatorToRecipeVariant.add(
      id,
      addIngredientsByIdDto,
    );
  }

  @Patch(':id/add-ingredients')
  async addProcedure(
    @Param() { id }: IdParam,
    @Body() addIngredientsByIdDto: AddIngredientsByIdDto,
  ): Promise<void> {
    return this.ingredientAgregatorToRecipeVariant.add(
      id,
      addIngredientsByIdDto,
    );
  }

  @Delete(':id/ingredients/:id')
  async removeIngredient(
    @Param('id') { id }: IdParam,
    @Param('ingredient-id') { id: ingredientId }: IdParam,
  ) {
    console.log(id, ingredientId);
  }
}
