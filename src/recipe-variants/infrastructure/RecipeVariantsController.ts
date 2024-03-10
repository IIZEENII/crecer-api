import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { RecipeVariantCopier } from '../application/RecipeVariantCopier';
import { IngredientAgregatorForRecipeVariant } from '../application/IngredientAgregatorForRecipeVariant';
import { IngredientRemoverForRecipeVariant } from '../application/IngredientRemoveForRecipeVariant';
import { ProcedureCreatorForRecipeVariant } from '../application/ProcedureCreatorForRecipeVariant';
import { RecipeVariantUpdater } from '../application/RecipeVariantUpdater';
import { RecipeVariantFinder } from '../application/RecipeVariantFinder';
import { IngredientsFinder } from '@src/ingredients/application/IngredientsFinder';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { CopyRecipeVariantDto } from './dtos/CopyRecipeVariant.dto';
import { RemoveIngredientParams } from './http/params/DeleteIngredientParams.dto';
import { AddIngredientsByIdDto } from './dtos/AddIngredientById.dto';
import { CreateProcedureDto } from '@src/procedures/infrastructure/dtos/CreateProcedure.dto';
import { UpdateRecipeVariantDto } from './dtos/UpdateRecipeVariant.dto';

@ApiTags('Recipe variants')
@Controller('recipe-variants')
export class RecipeVariantsController {
  constructor(
    private readonly recipeVariantFinder: RecipeVariantFinder,
    private readonly recipeVariantCopier: RecipeVariantCopier,
    private readonly recipeVariantUpdater: RecipeVariantUpdater,
    private readonly ingredientFinder: IngredientsFinder,
    private readonly ingredientAgregatorForRecipeVariant: IngredientAgregatorForRecipeVariant,
    private readonly ingredientRemoverToRecipeVariant: IngredientRemoverForRecipeVariant,
    private readonly procedureCreatorForRecipeVariant: ProcedureCreatorForRecipeVariant,
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

  @Patch(':id')
  async update(
    @Param() { id }: IdParam,
    @Body() updateRecipeVariantDto: UpdateRecipeVariantDto,
  ): Promise<void> {
    const recipeVariant = await this.recipeVariantFinder.findById(id);

    return this.recipeVariantUpdater.update(
      recipeVariant.id,
      updateRecipeVariantDto,
    );
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

    return await this.procedureCreatorForRecipeVariant.create(
      recipeVariant,
      createProcedureDto,
    );
  }
}
