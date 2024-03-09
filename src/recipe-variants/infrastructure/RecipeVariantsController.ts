import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CopyRecipeVariantDto } from './dtos/CopyRecipeVariant.dto';
import { RecipeVariantCopier } from '../application/RecipeVariantCopier';
import { IngredientAgregatorToRecipeVariant } from '../application/IngredientAgregatorToRecipeVariant';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { AddIngredientsByIdDto } from './dtos/AddIngredientById.dto';
import { ApiTags } from '@nestjs/swagger';
import { DeleteIngredientParams } from './http/params/DeleteIngredientParams.dto';
import { RecipeVariantFinder } from '../application/RecipeVariantFinder';
import { IngredientsFinder } from '@src/ingredients/application/IngredientsFinder';

@ApiTags('Recipe variants')
@Controller('recipe-variants')
export class RecipeVariantsController {
  constructor(
    private readonly recipeVariantFinder: RecipeVariantFinder,
    private readonly recipeVariantCopier: RecipeVariantCopier,
    private readonly ingredientFinder: IngredientsFinder,
    private readonly ingredientAgregatorToRecipeVariant: IngredientAgregatorToRecipeVariant,
  ) {}

  @Post(':id/copy')
  async copyVariant(
    @Param() { id }: IdParam,
    @Body() copyRecipeVariantDto: CopyRecipeVariantDto,
  ): Promise<void> {
    const recipeVariant =
      await this.recipeVariantFinder.findWithRecipetById(id);
    return this.recipeVariantCopier.copy(recipeVariant, copyRecipeVariantDto);
  }

  @Patch()
  async update(
    @Param() { id }: IdParam,
    @Body() addIngredientsByIdDto: AddIngredientsByIdDto,
  ): Promise<void> {
    console.log(id, addIngredientsByIdDto);
  }

  @Post(':id/ingredients')
  async addIngredients(
    @Param() { id }: IdParam,
    @Body() { ingredientIds }: AddIngredientsByIdDto,
  ): Promise<void> {
    const recipeVariant =
      await this.recipeVariantFinder.findWithIngredientsById(id);

    const ingredients =
      await this.ingredientFinder.findIngredientsByIds(ingredientIds);

    return this.ingredientAgregatorToRecipeVariant.add(
      recipeVariant,
      ingredients,
    );
  }

  @Delete(':id/ingredients/:ingredientId')
  async removeIngredientInRecipeVariant(
    @Param() { id, ingredientId }: DeleteIngredientParams,
  ) {
    console.log(id, ingredientId);
  }

  @Delete(':id')
  async remove(@Param() { id }: IdParam) {
    console.log(id);
  }

  @Post(':id/procedures')
  async addProcedure(
    @Param() { id }: IdParam,
    @Body() addIngredientsByIdDto: AddIngredientsByIdDto,
  ): Promise<void> {
    console.log(id, addIngredientsByIdDto);
  }

  @Patch(':id/procedures/:procedureId')
  async updateProcedure(
    @Param() { id }: IdParam,
    @Body() addIngredientsByIdDto: AddIngredientsByIdDto,
  ): Promise<void> {
    console.log(id, addIngredientsByIdDto);
  }

  @Delete(':id/procedures/:procedureId')
  async deleteProcedure(@Param() { id, ingredientId }: DeleteIngredientParams) {
    console.log(id, ingredientId);
  }
}
