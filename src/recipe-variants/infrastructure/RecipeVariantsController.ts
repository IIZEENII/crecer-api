import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CopyRecipeVariantDto } from './dtos/CopyRecipeVariant.dto';
import { RecipeVariantCopier } from '../application/RecipeVariantCopier';
import { IngredientAgregatorForRecipeVariant } from '../application/IngredientAgregatorForRecipeVariant';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { AddIngredientsByIdDto } from './dtos/AddIngredientById.dto';
import { ApiTags } from '@nestjs/swagger';
import { RemoveIngredientParams } from './http/params/DeleteIngredientParams.dto';
import { RecipeVariantFinder } from '../application/RecipeVariantFinder';
import { IngredientsFinder } from '@src/ingredients/application/IngredientsFinder';
import { IngredientRemoverForRecipeVariant } from '../application/IngredientRemoveForRecipeVariant';
import { ProcedureCreatorForRecipeVariant } from '../application/ProcedureCreatorForRecipeVariant';
import { CreateProcedureDto } from '@src/procedures/infrastructure/dtos/CreateProcedure.dto';

@ApiTags('Recipe variants')
@Controller('recipe-variants')
export class RecipeVariantsController {
  constructor(
    private readonly recipeVariantFinder: RecipeVariantFinder,
    private readonly recipeVariantCopier: RecipeVariantCopier,
    private readonly ingredientFinder: IngredientsFinder,
    private readonly ingredientAgregatorForRecipeVariant: IngredientAgregatorForRecipeVariant,
    private readonly ingredientRemoverToRecipeVariant: IngredientRemoverForRecipeVariant,
    private readonly procedureAgregatorForRecipeVariant: ProcedureCreatorForRecipeVariant,
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

    return this.ingredientAgregatorForRecipeVariant.add(
      recipeVariant,
      ingredients,
    );
  }

  @Delete(':id/ingredients/:ingredientId')
  async removeIngredientInRecipeVariant(
    @Param() { id, ingredientId }: RemoveIngredientParams,
  ) {
    const recipeVariant =
      await this.recipeVariantFinder.findWithIngredientsById(id);

    const ingredient = await this.ingredientFinder.findById(ingredientId);

    return await this.ingredientRemoverToRecipeVariant.remove(
      recipeVariant,
      ingredient.id,
    );
  }

  @Delete(':id')
  async remove(@Param() { id }: IdParam) {
    console.log(id);
  }

  @Post(':id/procedures')
  async addProcedure(
    @Param() { id }: IdParam,
    @Body() createProcedureDto: CreateProcedureDto,
  ): Promise<void> {
    const recipeVariant =
      await this.recipeVariantFinder.findWithProceduresById(id);

    return await this.procedureAgregatorForRecipeVariant.add(
      recipeVariant,
      createProcedureDto,
    );
  }

  @Patch(':id/procedures/:procedureId')
  async updateProcedure(
    @Param() { id }: IdParam,
    @Body() addIngredientsByIdDto: AddIngredientsByIdDto,
  ): Promise<void> {
    console.log(id, addIngredientsByIdDto);
  }

  @Delete(':id/procedures/:procedureId')
  async deleteProcedure(@Param() { id, ingredientId }: RemoveIngredientParams) {
    console.log(id, ingredientId);
  }
}
